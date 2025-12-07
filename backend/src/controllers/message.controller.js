import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';
import User from '../models/User.js';
import { successResponse } from '../utils/response.js';
import DMChannel from '../models/DMChannel.js';
import Message from '../models/Message.js';
import cloudinary from '../config/cloudinary.js';


/**
 * @route   GET /api/v1/messages/contacts
 * @desc    Get all users
 * @access  Private
 */

const getContacts = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const users = await User.find({_id:{$ne:userId}}).select('-password');

    if(!users){
        AppError('Failed to find users',400);
    }

    successResponse(res,200,'All users fetched succefully',users);
})


/**
 * @route   GET /api/v1/messages/myChannels
 * @desc    Get all my direct message list in last message order
 * @access  Private
 */

const getChannelList = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  // Find all DM channels where user is a member
  const channels = await DMChannel.find({ members: senderId })
    .sort({ updatedAt: -1 })
    .populate('members', 'username profilePic');

  if (!channels || channels.length === 0) {
    return successResponse(res, 200, 'No DM channels found', []);
  }

  const dmList = channels.map(channel => {
    const friend = channel.members.find(
      m => m._id.toString() !== senderId.toString()
    );

    return {
      channelId: channel._id,
      updatedAt: channel.updatedAt,
      friend
    };
  });

  successResponse(res, 200, 'DM list retrieved', dmList);
});


/**
 * @route   GET /api/v1/messages/:channelId/channel
 * @desc    Get all message from the dm channel
 * @access  Private
 */

const getDMChannel = asyncHandler(async(req,res)=>{
    const {channelId} = req.params;

    const limit = 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page -1) * limit;

    const channelMessages = await Message.find({channelId})
    .sort({createdAt:1})
    .skip(skip)
    .limit(limit)
    .populate('senderId',"fullName profilePic");

    if(!channelMessages){
        AppError('Failed to find messages',400);
    }

    successResponse(res,200,`Messages retrieved for channel Id : ${channelId}`,channelMessages);
})

/**
 * @route   POST /api/v1/messages/:receiverId
 * @desc    send a message to another user
 * @access  Private
 */


// Helper to upload file to Cloudinary per channel
const uploadMessageFile = (fileBuffer, channelId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `messages/channel_${channelId}`,
        resource_type: "auto", 
        quality: "auto",
        fetch_format: "auto"
      },
      (error, result) => {
        if (error) return reject(new AppError("File upload failed", 500));
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.params;
  const { content } = req.body;

  if (!receiverId) throw new AppError("No receiver found", 400);

  if (!content && !req.file) {
    throw new AppError("Please type a message or add a file", 400);
  }

  // Find or create DM channel
  let channel = await DMChannel.findOne({
    members: { $all: [senderId, receiverId] }
  });

  if (!channel) {
    channel = await DMChannel.create({
      members: [senderId, receiverId]
    });
  }

  const messageData = {
    channelId: channel._id,
    senderId,
    content: content || "",
    type: "text"
  };

  // Handle file upload if exists
  if (req.file) {
    const result = await uploadMessageFile(req.file.buffer, channel._id);
    messageData.type = "file"; 
    messageData.mediaUrl = result.secure_url;
    messageData.mediaSize = result.bytes;
    messageData.mediaName = result.original_filename;
  }

  // STEP 4 — Save message
  const message = await Message.create(messageData);

  // Update channel timestamp
  await DMChannel.updateOne(
    { _id: channel._id },
    { $set: { updatedAt: new Date() } }
  );

  successResponse(res, 201, `Message sent to: ${receiverId}`, message);
});


export{getContacts,getDMChannel,getChannelList,sendMessage};