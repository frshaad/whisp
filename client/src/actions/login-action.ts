'use server';

import { AxiosError } from 'axios';

import api from '@/lib/api';
import { loginSchema } from '@/lib/schema/auth-schema';

export async function loginAction(formData: FormData) {
  const formDataObj = Object.fromEntries(formData);
  const parsedData = loginSchema.safeParse(formDataObj);

  if (!parsedData.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const { data } = await api.post('/auth/login', parsedData.data);

    if (data?.status === 'success') {
      return {
        message: 'Login successful! Redirecting...',
      };
    }

    return {
      message: data?.message || 'Login failed. Please try again.',
      errors: data?.errors || {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response;
        return {
          message: `${data?.message || 'Invalid credentials.'}`,
          errors: data?.errors || {},
        };
      } else if (error.request) {
        return {
          message: 'No response from server. Please try again later.',
        };
      }
    }

    // Generic fallback for unknown errors
    return {
      message: `Unexpected error: ${(error as Error).message}`,
    };
  }
}
