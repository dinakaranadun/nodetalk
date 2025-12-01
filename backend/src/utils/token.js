// utils/token.js
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { 
  JWT_SECRET, 
  JWT_EXPIRES_IN, 
  JWT_REFRESH_SECRET, 
  JWT_REFRESH_EXPIRES_IN, 
  NODE_ENV 
} from '../config/env.js';
import ms from 'ms';
import RefreshToken from '../models/RefreshToken.js';

/**
 * Generate Access Token (JWT)
 */
const generateAccessToken = (res, userId, tokenVersion) => {
  const token = jwt.sign(
    { userId, tokenVersion }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: ms(JWT_EXPIRES_IN),
  });

  return token;
};

/**
 * Generate Refresh Token (JWT) and Store in DB
 */
const generateRefreshToken = async (res, userId, tokenVersion, req) => {
  const token = jwt.sign(
    { userId, tokenVersion }, 
    JWT_REFRESH_SECRET, 
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  await RefreshToken.create({
    userId,
    token: hashedToken, 
    deviceInfo: req?.headers?.['user-agent'] || 'Unknown Device',
    ipAddress: req?.ip || req?.connection?.remoteAddress,
    expiresAt: new Date(Date.now() + ms(JWT_REFRESH_EXPIRES_IN)),
  });

  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: ms(JWT_REFRESH_EXPIRES_IN),
  });

  return token;
};

/**
 * Verify Refresh Token 
 */
const verifyRefreshToken = async (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const storedToken = await RefreshToken.findOne({
      token: hashedToken,
      userId: decoded.userId,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!storedToken) {
      return null;
    }

    return {
      storedToken,
      decoded,
    };
  } catch (error) {
    return null;
  }
};

/**
 * Remove Refresh Token from Database
 */
const removeRefreshToken = async (token) => {
  if (!token) return;

  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    await RefreshToken.deleteOne({ token: hashedToken });
  } catch (error) {
    console.error('Error removing refresh token:', error);
  }
};

/**
 * Remove all refresh tokens for a user
 */
const removeAllUserTokens = async (userId) => {
  try {
    await RefreshToken.deleteMany({ userId });
  } catch (error) {
    console.error('Error removing all user tokens:', error);
  }
};

export { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken,
  removeRefreshToken,
  removeAllUserTokens
};