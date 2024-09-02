import { Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const generateTokenAndSetCookie = (
  userId: mongoose.Types.ObjectId,
  res: Response,
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '15d',
    });

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).send('Internal Server Error');
  }
};
