import express from 'express';
import passport from 'passport';

import { signupController } from './controllers/authController';
import { isAuthenticated } from './middleware';
import { configureLocalPassport, configureGooglePassport } from './passport';


const authRouter = express.Router();

configureLocalPassport(passport);

configureGooglePassport(passport)

authRouter.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('http://localhost:3001/login');
  });
});

authRouter.post('/signup', signupController)

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/oauth2/redirect/google', passport.authenticate('google'), (req, res, next) => {
  try {
        req.session.user = req.user
        req.session.authenticated = req.isAuthenticated()
    // res.json({ message: 'Login successful', user: req.user, isValid: req.isAuthenticated() });
        res.redirect('/');
    } catch (err) {
        res.redirect('/login')
    }
})

authRouter.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err: any, user: Express.User, info: { message: any; }) => {
      if (err || !user) {
        return res.status(401).json({ error: info?.message || 'Unauthorized' });
      }
  
      req.logIn(user, (err) => {
        if (err) return res.status(500).json({ error: 'Login error' });
        req.session.user = user;
        req.session.authenticated = true;
        return res.json({ message: 'Login successful', user });
      });
    })(req, res, next);
});
  
authRouter.get('/isAuthenticated', isAuthenticated, (req, res) => {
    // console.log("USER AUTHENTICATED", req.session?.user)
    res.json({ user: req.user });
  });


export default authRouter