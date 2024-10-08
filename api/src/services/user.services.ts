import { Response } from 'express';
import User from '../models/user.model';
import { UserType } from '../schemas/user.schema';
import { generateToken } from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

type SignupData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  res: Response;
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
