import { z } from 'zod';

const usernameRegex = /^[\d_a-z]+$/;

export const signupSchema = z
  .object({
    fullname: z.string().trim().min(1, 'Full name is required'),
    username: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .toLowerCase()
      .regex(
        usernameRegex,
        'Username must consist of lowercase letters, numbers, and underscores',
      ),
    email: z.string().trim().email('Invalid email address').toLowerCase(),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirm;
    },
    {
      message: 'Passwords must match!',
      path: ['passwordConfirm'],
    },
  );

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required').toLowerCase(),
  password: z.string().trim().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
