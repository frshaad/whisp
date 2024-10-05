'use server';

import { cookies } from 'next/headers';

import api from '@/lib/api';
import { SignupFormValues } from '@/lib/schema/auth-schema';
import { AuthActionResult, AuthSuccessResponse } from '@/types/auth-actions';

export const signupAction = async (
  data: SignupFormValues,
): Promise<AuthActionResult> => {
  try {
    const res = await api.post<AuthSuccessResponse>('/auth/signup', data, {
      withCredentials: true,
    });

    const setCookieHeader = res.headers['set-cookie'];
    if (setCookieHeader) {
      const cookieStore = cookies();
      setCookieHeader.forEach((cookie) => {
        cookieStore.set('jwt', cookie);
      });
    }

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return {
        status: 'failed',
        message: 'An unexpected error occurred during sign up.',
      };
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return {
        status: 'failed',
        message: error.response.data.message || 'Sign up failed.',
      };
    }

    return {
      status: 'failed',
      message: error.message || 'An unknown error occurred.',
    };
  }
};
