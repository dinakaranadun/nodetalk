import express from 'express'
import { getUserProfile, updateAvatar } from '../controllers/user.controller.js';
import upload from '../middleware/multer.middlware.js';
import authMiddleware from '../middleware/auth.middleware.js';


const userRouter = express.Router();

userRouter.get('/me',authMiddleware,getUserProfile);
userRouter.patch('/update-avatar',authMiddleware,upload.single('avatar'),updateAvatar);

export default userRouter;