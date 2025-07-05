"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3700;
const allowedOrigins = ['http://localhost:3700', 'http://localhost:3001'];
const allowedMethods = ['GET', 'POST', 'PUT'];
const allowedHeaders = ['Authorization', 'Content-Type'];
const credentials = true;
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like curl or Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Domain not allowed by CORS'));
        }
    },
    methods: allowedMethods,
    allowedHeaders: allowedHeaders,
    credentials: credentials,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
// get Dummy Users
function getUsers(url, method) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            return result === null || result === void 0 ? void 0 : result.users;
        }
        catch (err) {
            throw err;
        }
    });
}
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`<h1>Hello Friend</h1>`);
});
app.get('/users', (req, res) => {
    getUsers('https://dummyjson.com/users', 'GET')
        .then(users => { console.log(users); res.json(users); })
        .catch(err => console.error(err));
});
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`);
});
