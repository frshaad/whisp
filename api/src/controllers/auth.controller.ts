import { Request, Response } from 'express';

import {
  getAuthenticatedUserService,
  loginService,
  logoutService,
  signupService,
} from '../services/user.services';

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
    const user = await loginService({ username, password, res });

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
    logoutService(res);
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

    const authUser = await getAuthenticatedUserService(user._id as string);

    res.status(200).json({ status: 'success', user: authUser });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        status: 'failed',
        message: error.message,
      });
    }

    console.error('Error in getAuthenticatedUser controller:', error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
};
