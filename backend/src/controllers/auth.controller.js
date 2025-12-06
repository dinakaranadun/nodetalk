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
import { CLIENT_URL } from '../config/env.js';

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
 * @route   POST /api/v1/auth/signUp
 * @desc    Register a new user
 * @access  Public
 */
const signUp = asyncHandler(async(req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
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

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new AppError("Email already registered", 400);
    }

    const user = await User.create({ fullName, email, password });

    generateAccessToken(res, user._id, user.tokenVersion);
    await generateRefreshToken(res, user._id, user.tokenVersion, req);

    successResponse(res, 201, "Registration successful", {
        _id: user._id,
        fullName: user.fullName,
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

export { signIn, signUp, signOut, refreshToken };