import express from 'express'
import { getUserProfile, updateAvatar } from '../controllers/user.controller.js';
import upload from '../middleware/multer.middlware.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { arcjetExpensive, arcjetRead } from '../middleware/arcject.middlware.js';


const userRouter = express.Router();

userRouter.get('/me',authMiddleware,arcjetRead,getUserProfile);
userRouter.patch('/update-avatar',authMiddleware,arcjetExpensive,upload.single('avatar'),updateAvatar);

export default userRouter;