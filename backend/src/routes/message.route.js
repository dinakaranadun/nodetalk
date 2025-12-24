import express from 'express'
import { getChannelList, getContacts, getDMChannel, sendMessage } from '../controllers/message.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middlware.js';


const messageRouter = express.Router();

messageRouter.get('/contacts',authMiddleware,getContacts);
messageRouter.get('/myChannels',authMiddleware,getChannelList);
messageRouter.get('/:channelId/channel',authMiddleware,getDMChannel);
messageRouter.post('/:receiverId/send', authMiddleware, upload.single('file'), sendMessage);
export default messageRouter;