import { Request, Response } from 'express';
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUsername,
} from '../utils/validator-utils';
import User from '../models/user.model';
import hashPassword from '../utils/hashPassword';
import { generateTokenAndSetCookie } from '../utils/generateToken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    const validations = [
      { isValid: validateUsername(username), field: 'username' },
      { isValid: validateEmail(email), field: 'email' },
      { isValid: validatePassword(password), field: 'password' },
      { isValid: validateFullName(fullname), field: 'fullname' },
    ];

    for (const { isValid, field } of validations) {
      const [isFieldValid, validationMsg] = isValid;
      if (!isFieldValid) {
        return res.status(400).json({
          status: 'failed',
          message: `${field} validation failed: ${validationMsg}`,
        });
      }
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        status: 'failed',
        message:
          existingUser.username === username
            ? 'Username is already taken'
            : 'Email is already in use',
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      status: 'success',
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Error in signup controller:', error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
};

// export const login = async (req: Request, res: Response) => {};

// export const logout = async (req: Request, res: Response) => {};
