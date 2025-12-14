import { CLIENT_URL, GOOGLE_CLIENT_ID } from '../config/env.js';
import asyncHandler from 'express-async-handler';
import validator from 'validator';
import AppError from '../utils/apperror.js';
import User from '../models/User.js';
import { successResponse } from '../utils/response.js';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  removeRefreshToken,
  verifyRefreshToken
} from '../utils/token.js';
import { sendWelcomeEmail } from '../config/resend.js';

import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * @route   POST /api/v1/auth/signIn
 * @desc    Sign in the user
 * @access  Public
 */
const signIn = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("All fields are required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
        generateAccessToken(res, user._id, user.tokenVersion);
        await generateRefreshToken(res, user._id, user.tokenVersion, req);
        
        successResponse(res, 200, "Login successful", {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        });
    } else {
        throw new AppError('Invalid Credentials', 400);
    }
});


/**
 * @route POST /api/v1/auth/googleAuth
 * @desc Sign in the user with google credentials or if user currently has account add googleId to their account
 * @access Public
 */

//generate username for new sign up
const generateUniqueUsername = async (baseName, email) => {
  let username = (baseName || email.split('@')[0])
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9_]/g, '');
  
  if (username.length > 15) {
    username = username.substring(0, 15);
  }

  let existingUser = await User.findOne({ userName: username });
  
  if (!existingUser) {
    return username;
  }

  for (let i = 0; i < 10; i++) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4 digits
    const newUsername = `${username}${randomSuffix}`;
    
    existingUser = await User.findOne({ userName: newUsername });
    
    if (!existingUser) {
      return newUsername;
    }
  }

  return `${username}${Date.now()}`;
};


const googleAuth = asyncHandler(async(req, res) => {
  const { access_token, email, googleId, name, picture } = req.body;
    
  if(!access_token || !email || !googleId){
    throw new AppError('Missing required Google authentication data', 400);
  }

  let newUser = false;
  
  try {
    await client.getTokenInfo(access_token);
    
    let user = await User.findOne({ email });
    
    if(user){
      if(!user.googleId){
        user.googleId = googleId;
        user.provider = user.password ? "both" : "google";
        user.profilePic = user.profilePic || picture;
        await user.save();
      }
    } else {
        const uniqueUsername = await generateUniqueUsername(name, email);

        user = await User.create({
            userName: uniqueUsername,
            email,
            googleId,
            provider: "google",
            profilePic: picture,
        });
      newUser = true;
    }

    generateAccessToken(res, user._id, user.tokenVersion);
    await generateRefreshToken(res, user._id, user.tokenVersion, req);

    const statusCode = newUser ? 201 : 200;
    const message = newUser ? "Registration successful" : "Login successful";
    
    successResponse(res, statusCode, message, {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });

    if(newUser){
      try {
        await sendWelcomeEmail(email, user.userName, CLIENT_URL);
        console.log(`${new Date().toISOString()} - ✅ Welcome email sent to ${email}`);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    }
    
  } catch (err) {
    console.error('Google auth error:', err);
    
    if (err instanceof AppError) {
      throw err;
    }
    
    throw new AppError('Google authentication failed: ' + err.message, 400);
  }
});

/**
 * @route   POST /api/v1/auth/signUp
 * @desc    Register a new user
 * @access  Public
 */
const signUp = asyncHandler(async(req, res) => {
    const { userName, email, password, confirmPassword } = req.body;

    if (!userName || !email || !password || !confirmPassword) {
        throw new AppError("All fields are required", 400);
    }

    if (password !== confirmPassword) {
       throw new AppError("Passwords do not match", 400);
    }

    if (!validator.isEmail(email)) {
        throw new AppError("Invalid Email", 400);
    }
    
    if (!validator.isStrongPassword(password)) {
        throw new AppError("Password must include uppercase, lowercase, number, symbol and be 8+ chars", 400);
    }

    const userExists = await User.findOne({
            $or: [
                { userName: userName },
                { email: email }
            ]
            });

    if (userExists) {
        if (userExists.userName === userName) {
            return res.status(400).json({ success: false, message: "Username already taken" });
        }
        if (userExists.email === email) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }
    }

    const user = await User.create({ userName, email, password, provider:"local" });

    generateAccessToken(res, user._id, user.tokenVersion);
    await generateRefreshToken(res, user._id, user.tokenVersion, req);

    successResponse(res, 201, "Registration successful", {
        _id: user._id,
        userName: user.userName,
        email: user.email,
    });

    try {
        await sendWelcomeEmail(email, fullName, CLIENT_URL);
        console.log(`${new Date().toISOString()} - ✅ Welcome email sent to ${email}`);
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
});

/**
 * @route   POST /api/v1/auth/signOut
 * @desc    Sign out the user
 * @access  Private
 */
const signOut = asyncHandler(async(req, res) => {
    const { refreshToken } = req.cookies;

    await removeRefreshToken(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    successResponse(res, 200, "Logged out successfully");
});

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
const refreshToken = asyncHandler(async(req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new AppError("Refresh token not found", 401);
    }

    const tokenData = await verifyRefreshToken(refreshToken);

    if (!tokenData) {
        throw new AppError("Invalid or expired refresh token", 403);
    }

    const { storedToken, decoded } = tokenData;

    const user = await User.findById(decoded.userId);
    
    if (!user) {
        throw new AppError("User not found", 401);
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
        throw new AppError("Token version mismatch", 401);
    }

    storedToken.lastUsedAt = new Date();
    await storedToken.save();

    generateAccessToken(res, user._id, user.tokenVersion);

    successResponse(res, 200, "Access token refreshed");
});

export { signIn, googleAuth, signUp, signOut, refreshToken };