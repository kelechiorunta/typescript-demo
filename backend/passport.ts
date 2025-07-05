import { Strategy as LocalStrategy } from "passport-local";
import passport from 'passport'
import User from "./models/User";
import { Strategy as GoogleStrategy, StrategyOptionsWithRequest, Profile } from 'passport-google-oauth20';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();
// import passport from 'passport'

export const configureLocalPassport = (passport: any) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username: string, password: any, done: any) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'No subscriber found' });
                }

                const isValid = await user.comparePassword(password);
                if (!isValid) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    
    ));

    passport.use(passport.serializeUser((user: any, done: any) => {
        done(null, user.id); // or user._id depending on your DB
        // console.log(user.id)
        }),
    
    passport.deserializeUser(async (id: any, done: any) => {
        try {
            const user = await User.findById(id); // or your user model
            done(null, user);
            // console.log("serialized", user)
        } catch (err) {
            done(err);
        }
    }))

}

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientID || !clientSecret) {
  throw new Error('Google OAuth credentials are missing from environment variables.');
}

const callbackURL = 'http://localhost:3001/oauth2/redirect/google';

const strategyOptions: StrategyOptionsWithRequest = {
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true,
  };
  

export const configureGooglePassport = (passportInstance: typeof passport) => {
    passportInstance.use(
      new GoogleStrategy(
       strategyOptions,
          async (
          req: Request,
          accessToken: string,
          refreshToken: string,
          profile: Profile,
          done: (error: any, user: any ) => void
        ) => {
          const email = profile.emails?.[0]?.value;
          if (!email) return done(new Error('No email found in Google profile'), null);
  
          const newUserData = {
            'google.name': profile.displayName,
            'google.email': email,
            'google.accessToken': accessToken,
            active: true,
          };
  
          try {
            const googleUser = await User.findOne({ 'google.email': email });
            const localUser = await User.findOne({ email });
  
            if (googleUser) {
              return done(null, googleUser);
            }
  
            if (localUser) {
              localUser.google = {
                email,
                displayName: profile.displayName,
                accessToken,
              };
              await localUser.save();
              console.log('Local user updated with Google info');
              return done(null, localUser);
            }
  
            const user = await User.create(newUserData);
            return done(null, user);
          } catch (err: any) {
            console.error('Google authentication error:', err?.message);
            return done(err, null);
          }
        }
      )
    );
  
    // Serialize user
    passportInstance.serializeUser((user: any, done: any) => {
      done(null, user.id);
    });
  
    // Deserialize user
    passportInstance.deserializeUser(async (id: string, done: any) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    });
  };