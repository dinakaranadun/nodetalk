import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DMChannel",
    required: true
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // text content
  content: {
    type: String,
    default: ""
  },

  // message type: "text", "image", "file", "audio", etc.
  type: {
    type: String,
    enum: ["text", "image", "file", "audio"],
    default: "text"
  },

  // media fields
  mediaUrl: {
    type: String,
    default: null
  },

  mediaSize: {
    type: Number, // bytes
    default: null
  },

  mediaName: {
    type: String,
    default: null
  }

}, { timestamps: true });

const Message = mongoose.model('Message',messageSchema);
export default Message;
