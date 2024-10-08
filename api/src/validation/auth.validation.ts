import { z } from 'zod';

export const signupSchema = z
  .object({
    fullname: z.string().trim().min(1, 'Full name is required'),
    username: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .regex(
        /^[a-z0-9_]+$/,
        'Username can only contain lowercase letters, numbers, and underscores',
      ),
    email: z.string().trim().email('Invalid email address'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match!',
    path: ['passwordConfirm'],
  });

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().trim().min(1, 'Password is required'),
});
