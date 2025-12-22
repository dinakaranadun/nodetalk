import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';
import User from '../models/User.js';
import { successResponse } from '../utils/response.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @route   GET /api/v1/user/me
 * @desc    Get current logged-in user details
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new AppError("User Not Found", 404);
    }

    successResponse(res, 200, "User details retrieved successfully", user);
});

/**
 * @route   PATCH /api/v1/user/update-avatar
 * @desc    Update user avatar
 * @access  Private
 */

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "avatars",
        width: 300,
        crop: "scale",
        quality: "auto",
        fetch_format: "auto",
      },
      (error, result) => {
        if (error) return reject(new AppError("Upload failed", 500));
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

const updateAvatar = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  if (!req.file) {
    throw new AppError("No image uploaded", 400);
  }

  const resultCloudinary = await uploadToCloudinary(req.file.buffer);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic: resultCloudinary.secure_url },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new AppError("Avatar update failed", 400);
  }

  successResponse(res, 200, "Avatar updated successfully", updatedUser);
});

export{getUserProfile,updateAvatar}