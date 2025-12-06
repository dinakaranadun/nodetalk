import express from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.get("/check-user", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});
authRouter.post('/signIn',signIn);
authRouter.post('/signUp',signUp);

export default authRouter;

