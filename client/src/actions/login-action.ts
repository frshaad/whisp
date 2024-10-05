'use server';

import { cookies } from 'next/headers';

import api from '@/lib/api';
import { LoginFormValues } from '@/lib/schema/auth-schema';
import { AuthActionResult, AuthSuccessResponse } from '@/types/auth-actions';

export const loginAction = async (
  data: LoginFormValues,
): Promise<AuthActionResult> => {
  try {
    const res = await api.post<AuthSuccessResponse>('/auth/login', data, {
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
        message: 'An unexpected error occurred during login.',
      };
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return {
        status: 'failed',
        message: error.response.data.message || 'Login failed.',
      };
    }

    return {
      status: 'failed',
      message: error.message || 'An unknown error occurred.',
    };
  }
};
