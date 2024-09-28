import { Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  res: Response,
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};
