import type { Response } from 'express';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-z0-9_]{3,20}$/;
const fullNameRegex = /^[a-zA-Z\s]{1,50}$/;

export const validateEmail = (email: string): [boolean, string] => {
  if (!emailRegex.test(email)) {
    return [false, 'Invalid Email format'];
  }
  return [true, ''];
};

export const validateUsername = (username: string): [boolean, string] => {
  if (!usernameRegex.test(username)) {
    return [
      false,
      'Username must be 3-20 characters long and can only contain lowercase letters, numbers, and underscores.',
    ];
  }
  return [true, ''];
};

export const validatePassword = (password: string): [boolean, string] => {
  if (password.length < 8) {
    return [false, 'Password must be at least 8 characters long.'];
  }
  return [true, ''];
};

export const validateFullName = (fullName: string): [boolean, string] => {
  if (!fullNameRegex.test(fullName)) {
    return [
      false,
      'Full name must be 1-50 characters long and can only contain letters and spaces.',
    ];
  }
  return [true, ''];
};

export const handleValidation = (
  res: Response,
  validations: { isValid: [boolean, string]; field: string }[],
) => {
  for (const { isValid, field } of validations) {
    const [isFieldValid, validationMsg] = isValid;
    if (!isFieldValid) {
      return res.status(400).json({
        status: 'failed',
        message: `${field} validation failed: ${validationMsg}`,
      });
    }
  }
};
