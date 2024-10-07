'use server';

import { cookies } from 'next/headers';

import api from '@/lib/api';
import { parseSetCookie } from '@/lib/parse-set-cookie';
import { LoginFormValues } from '@/lib/schema/auth-schema';
import { AuthActionResult, AuthSuccessResponse } from '@/types/auth-actions';

export const loginAction = async (
  data: LoginFormValues,
): Promise<AuthActionResult> => {
  try {
    const res = await api.post<AuthSuccessResponse>('/auth/login', data, {
      withCredentials: true,
    });

    if (res.status >= 200 && res.status < 300) {
      const cookieStore = cookies();
      const setCookieHeader = res.headers['set-cookie'];

      if (setCookieHeader) {
        setCookieHeader.forEach((cookie) => {
          const { name, value, options } = parseSetCookie(cookie);

          cookieStore.set(name, value, options);
        });
      }

      return res.data;
    } else {
      return {
        status: 'failed',
        message: 'Login failed. Please check your credentials.',
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
