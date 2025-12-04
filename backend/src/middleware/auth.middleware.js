import User from '../models/User.js';
import { JWT_SECRET } from "../config/env.js";
import AppError from "../utils/apperror.js";
import { verifyRefreshToken, generateAccessToken } from "../utils/token.js";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    let { accessToken, refreshToken } = req.cookies;

    try {
        if (!accessToken) {
            throw new AppError('Access token not found', 401);
        }

        try {
            const decoded = jwt.verify(accessToken, JWT_SECRET);
            
            const user = await User.findById(decoded.userId).select('-password');

            if (!user) {
                throw new AppError('User Not Found', 401);
            }

            if (decoded.tokenVersion !== user.tokenVersion) {
                throw new AppError('Token version mismatch', 401);
            }

            req.user = user;
            return next();

        } catch (error) {
            // Access token expired or invalid
            if (error.name !== 'TokenExpiredError') {
                throw new AppError('Invalid access token', 401);
            }

            // Try to refresh using refresh token
            if (!refreshToken) {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                throw new AppError('Session expired. Please login again', 401);
            }

            const tokenData = await verifyRefreshToken(refreshToken);

            if (!tokenData) {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                throw new AppError('Session expired. Please login again', 401);
            }

            const { storedToken, decoded } = tokenData;

            // Get user
            const user = await User.findById(decoded.userId).select('-password');

            if (!user) {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                throw new AppError('User not found. Please login again', 401);
            }

            if (decoded.tokenVersion !== user.tokenVersion) {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                throw new AppError('Session invalid. Please login again', 401);
            }

            storedToken.lastUsedAt = new Date();
            await storedToken.save();

            generateAccessToken(res, user._id, user.tokenVersion);

            req.user = user;
            return next();
        }

    } catch (error) {
        next(error);
    }
};

export { authMiddleware };