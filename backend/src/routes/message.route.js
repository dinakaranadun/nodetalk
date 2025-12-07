import express from 'express'
import { getChannelList, getContacts, getDMChannel, sendMessage } from '../controllers/message.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';


const messageRouter = express.Router();

messageRouter.get('/contacts',authMiddleware,getContacts);
messageRouter.get('/myChannels',authMiddleware,getChannelList);
messageRouter.get('/:channelId/channel',authMiddleware,getDMChannel);
messageRouter.post('/contacts',authMiddleware,sendMessage);

export default messageRouter;