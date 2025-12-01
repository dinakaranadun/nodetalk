import express from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signIn',signIn);
authRouter.post('/signUp',signUp);

export default authRouter;

