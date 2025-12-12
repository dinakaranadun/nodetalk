import User from '../models/User.js';
import { JWT_SECRET } from "../config/env.js";
import AppError from "../utils/apperror.js";
import { verifyRefreshToken, generateAccessToken } from "../utils/token.js";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  try {
    let shouldTryRefresh = false;

    if (!accessToken && !refreshToken) {
      throw new AppError('Authentication required', 401);
    }

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);

        const user = await User.findById(decoded.userId).select('_id tokenVersion');

        if (!user) {
          throw new AppError('User not found', 401);
        }

        if (decoded.tokenVersion !== user.tokenVersion) {
          throw new AppError('Token invalidated', 401);
        }

        req.user = {
          _id: user._id,
          userName:user.userName,
          tokenVersion: user.tokenVersion
        };

        return next();

      } catch (error) {
        if (error instanceof AppError) {
          throw error;
        }

        // access token expired → try refresh next
        if (error.name === 'TokenExpiredError') {
          shouldTryRefresh = true;
        } else {
          throw new AppError("Invalid access token", 401);
        }
      }
    }


    // no access token or expired
  
    if (!refreshToken) {
      const message = shouldTryRefresh
        ? "Access token expired"
        : "Session expired. Please login again";
      throw new AppError(message, 401);
    }

    const tokenData = await verifyRefreshToken(refreshToken);

    if (!tokenData) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      throw new AppError('Invalid session. Please login again', 401);
    }

    const { storedToken, decoded } = tokenData;

    const user = await User.findById(decoded.userId).select('_id tokenVersion');

    if (!user) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      throw new AppError('User not found. Please login again', 401);
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      throw new AppError('Session invalidated. Please login again', 401);
    }

    // update refresh token usage
    storedToken.lastUsedAt = new Date();
    await storedToken.save();

    // issue new access token
    generateAccessToken(res, user._id, user.tokenVersion);

    req.user = {
      _id: user._id,
      tokenVersion: user.tokenVersion
    };

    return next();

  } catch (error) {
    if (error.statusCode === 401) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
    }
    next(error);
  }
};

export default authMiddleware;
