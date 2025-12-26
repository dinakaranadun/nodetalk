import jwt from "jsonwebtoken";
import cookie from "cookie";
import AppError from "../utils/apperror.js";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/env.js";

const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const accessToken = cookies.accessToken; 

    if (!accessToken) {
      console.log("Socket rejected: No access token");
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(accessToken, JWT_SECRET);
    if (!decoded) {
      return next(new Error("Invalid token"));
    }

    const user = await User.findById(decoded.userId).select(
      "_id tokenVersion email userName profilePic"
    );

    if (!user) {
      return next(new Error("User not found"));
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      return next(new Error("Token invalidated"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated: ${user.userName}`);
    next();
  } catch (err) {
    console.error("Socket auth error:", err.message);
    next(new Error("Authentication failed"));
  }
};

export default socketAuthMiddleware;
