import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access denied. No token provided.',
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access denied. Invalid token.',
      });
    }

    if (typeof decoded === 'object' && 'userId' in decoded) {
      req.userId = (decoded as JwtPayload).userId;
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid token.',
      });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'Access denied. User not found.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    res.status(401).json({
      status: 'failed',
      message: 'Invalid token.',
    });
  }
}
