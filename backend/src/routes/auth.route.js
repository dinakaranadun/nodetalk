import express from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { arcjetAuth } from '../middleware/arcjet.middleware.js';

const authRouter = express.Router();

authRouter.get("/check-user", arcjetAuth,authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});
authRouter.get("/checkrate", arcjetAuth,(req, res) => {
    res.status(200).json({
        success: true
    })
});
authRouter.post('/signIn',arcjetAuth,signIn);
authRouter.post('/signUp',arcjetAuth,signUp);

export default authRouter;

