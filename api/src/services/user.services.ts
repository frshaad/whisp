import bcrypt from 'bcryptjs';
import type { Response } from 'express';

import { User, type UserType } from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

type LoginData = {
  username: string;
  password: string;
  res: Response;
};

type SignupData = LoginData & {
  fullname: string;
  email: string;
};

export const signupService = async ({
  email,
  fullname,
  password,
  username,
  res,
}: SignupData): Promise<UserType> => {
  const normalizedUsername = username.toLowerCase();
  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  });
  if (existingUser) {
    throw new Error(
      existingUser.username === normalizedUsername
        ? 'Username is already taken'
        : 'Email is already in use',
    );
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    fullname,
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
  });

  generateToken(newUser._id, res);

  return newUser;
};

export const loginService = async ({
  password,
  username,
  res,
}: LoginData): Promise<UserType> => {
  const normalizedUsername = username.toLowerCase();

  const user = await User.findOne({ username: normalizedUsername });
  if (!user) {
    throw new Error('Invalid username');
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    user.password,
  );
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }

  generateToken(user._id, res);

  return user;
};

export const logoutService = (res: Response): void => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
};

export const getAuthenticatedUserService = async (
  userId: string,
): Promise<UserType> => {
  const authUser = await User.findById(userId).select('-password');
  if (!authUser) {
    throw new Error('User not found');
  }

  return authUser;
};
