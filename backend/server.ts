import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT: number = 3700;

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

app.use(cors(corsOptions));
app.use(bodyParser.json());

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
