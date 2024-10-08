import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import { signupService } from '../services/user.services';

// Sign Up
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;
    const user = await signupService({
      fullname,
      username,
      email,
      password,
      res,
    });

    res.status(201).json({ status: 'success', user });
  } catch (error) {
    console.error('Error in signup controller:', error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
};

// Log In
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const normalizedUsername = username.toLowerCase();

    const user = await User.findOne({ username: normalizedUsername });
    if (!user) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Invalid username' });
    }

    const isPasswordMatch = await bcrypt.compare(
      password as string,
      user.password,
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Invalid password' });
    }

    generateToken(user._id, res);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
};

// Log Out
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });
    res
      .status(200)
      .json({ status: 'success', message: 'User logged out Successfully' });
  } catch (error) {
    console.error('Error in logout controller:', error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
};

// Get Authenticated User
export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'User not authenticated',
      });
    }

    const authUser = await User.findById(user._id);

    if (!authUser) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      user: authUser,
    });
  } catch (error) {
    console.error('Error in getAuthenticatedUser controller:', error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
};
