import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import ConnectMongoDBSession from 'connect-mongodb-session';
import session from 'express-session';
import passport from 'passport';
import { fileURLToPath } from 'url';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlHTTP } from 'express-graphql';
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();
import authRouter from './authRouter';
import { connectDB } from './db';
import resolvers from './resolvers';

// Initiate app and environment variables
const app = express();
const PORT: number = 3700;
const mongo_uri = process.env.MONGO_URI
const session_secret = process.env.SESSION_SECRET

// Initialize schema
const typeDefs = loadFilesSync(path.join(__dirname, 'schema.graphql'))
const schema = makeExecutableSchema({
    typeDefs, resolvers
})

// Cors options
const allowedOrigins: string[] = ['http://localhost:3700', 'http://localhost:3001'];
const allowedMethods = ['GET', 'POST', 'PUT'] ;
const allowedHeaders = ['Authorization', 'Content-Type'];
const credentials = true;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Domain not allowed by CORS'));
    }
  },
  methods: allowedMethods,
  allowedHeaders,
  credentials,
};

// Mongo Database Connection
if (!mongo_uri) {
    throw new Error('Database credentials are missing from environment variables.');
  }
connectDB(mongo_uri!)

// Session store configuration 
const MongoDBStore = ConnectMongoDBSession(session)
const store = new MongoDBStore({
  uri: mongo_uri,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7
} // Sessions expire after 1 week}
);

// Session options
if (!session_secret) {
    throw new Error('Session secret is missing from environment variables.');
  }
const sessionOptions: any = {
    name: "auth_session",
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,           // don’t use true unless HTTPS
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
}

// Third-party Middlewares for cors, bodyParser and session
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session(sessionOptions));

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Setup auth routes
app.use('/auth', authRouter)

// Setup graphql transport layer graphqlHTTP

  // Middleware to enable GraphQL Introspection and Client Queries
  app.use(
    '/graphql',
    graphqlHTTP((req: any) => {
      const isDev = process.env.NODE_ENV === 'development';
      const protocol = isDev ? 'http' : 'https';//'ws' : 'wss';
      const host = isDev ? 'localhost:3700' : req.headers.host;
  
      return {
        schema,
          context: {   
                req,
                isAuthenticated: req.isAuthenticated?.(),
                user: req.user ?? req.session?.user,
          },
        graphiql: true
        // graphiql: {
        //   subscriptionEndpoint: `${protocol}://${host}/graphql`,
        // },
      };
    })
);  

// get Dummy Users
export async function getUsers(url: string, method: "GET" | "POST"): Promise<any[]> {
    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }
   
        try {
            const response = await fetch(url, options)
            const result = await response.json();
            return result?.users
        }
        catch(err) {
            throw err
        }
}

app.get('/', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`<h1>Hello Friend</h1>`);
});

app.get('/users', (req: Request, res: Response) => {
    getUsers('https://dummyjson.com/users', 'GET' )
    .then(users => { console.log(users); res.json(users) })
    .catch(err => console.error(err));

})

// Create a http server instance of the express app/server
const httpServer = createServer(app);

// Bind the httpServer to the socket.io server(websocket server) for initial TCP handshake/connection
const io = new Server(httpServer, { cors: corsOptions })

// Get the io reference from the app server
app.set('io', io);

// socket-io server listens for bidirectional and persistent TCP connection with io-client
io.on('connection', () => {
    console.log('Socket.io server is connected')
})

// http server listens for initial TCP connection
httpServer.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
