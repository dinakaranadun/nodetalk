import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN, NODE_ENV } from '../config/env.js';
import ms from 'ms';

const generateAccessToken = (res, userId, tokenVersion) => {
  const token = jwt.sign({ userId, tokenVersion }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: ms(JWT_EXPIRES_IN),
  });

  return token;
};

const generateRefreshToken = (res, userId, tokenVersion) => {
  const token = jwt.sign({ userId, tokenVersion }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: ms(JWT_REFRESH_EXPIRES_IN),
  });

  return token;
};

export{generateAccessToken,generateRefreshToken};