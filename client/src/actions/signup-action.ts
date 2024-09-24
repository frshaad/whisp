'use server';

import axios from 'axios';

import api from '@/lib/api';
import { signupSchema } from '@/lib/schema/auth-schema';

export type FormState = {
  message: string;
  errors?: Record<string, unknown>;
};

export async function signUpAction(formData: FormData) {
  const formDataObj = Object.fromEntries(formData);
  const parsedData = signupSchema.safeParse(formDataObj);

  if (!parsedData.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const { data } = await api.post('/auth/signup', parsedData.data);

    if (data?.status === 'success') {
      return {
        message: '🎉 Hooray! You can now log in.',
      };
    }

    // Handle API-specific errors (e.g., user already exists)
    return {
      message: data?.message || 'Sign-up failed due to a server error.',
      errors: data?.errors || {},
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data } = error.response;
        return {
          message: `${data?.message || 'Something went wrong.'}`,
          errors: data?.errors || {},
        };
      } else if (error.request) {
        return {
          message: 'No response from server. Please try again later.',
        };
      }
    } else if (error instanceof Error) {
      return {
        message: `Unexpected error: ${error.message}`,
      };
    }

    return {
      message: 'An unknown error occurred.',
    };
  }
}
