import { z } from 'zod';

export const signupSchema = z
  .object({
    fullname: z.string().trim().min(1, 'Full name is required'),
    username: z.string().trim().min(1, 'Username is required'),
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
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    },
  );

export type SignupFormValues = z.infer<typeof signupSchema>;
