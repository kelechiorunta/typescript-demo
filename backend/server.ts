import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ConnectMongoDBSession from 'connect-mongodb-session'
import session from 'express-session'

dotenv.config();
import authRouter from './authRouter';
import { connectDB } from './db';



const app = express();
const PORT: number = 3700;
const mongo_uri = process.env.MONGO_URI
const session_secret = process.env.SESSION_SECRET

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
  allowedHeaders: allowedHeaders,
  credentials: credentials,
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
    store: store
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use('/auth', authRouter)

// get Dummy Users
async function getUsers(url: string, method: "GET" | "POST"): Promise<any[]> {
    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
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

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
