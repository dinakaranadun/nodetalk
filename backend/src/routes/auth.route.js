import express from 'express';
import { googleAuth, signIn, signOut, signUp } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { arcjetRead,arcjetAuth } from '../middleware/arcjet.middleware.js';

const authRouter = express.Router();

authRouter.get("/check-user", authMiddleware,arcjetRead, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});
authRouter.post('/signIn',signIn);
authRouter.post('/signUp',signUp);
authRouter.post('/signOut',arcjetAuth,signOut);
authRouter.post('/google/auth',googleAuth);


export default authRouter;

