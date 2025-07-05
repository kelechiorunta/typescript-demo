import express from 'express'
import { signupController } from './controllers/authController';

const authRouter = express.Router();

authRouter.post('/', signupController)

export default authRouter