'use server';

import { cookies } from 'next/headers';

import api from '@/lib/api';
import { parseSetCookie } from '@/lib/parse-set-cookie';
import { SignupFormValues } from '@/lib/schema/auth-schema';
import { AuthActionResult, AuthSuccessResponse } from '@/types/auth-actions';

export const signupAction = async (
  data: SignupFormValues,
): Promise<AuthActionResult> => {
  try {
    const res = await api.post<AuthSuccessResponse>('/auth/signup', data, {
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
        message: 'Sign up failed. Please check your inputs.',
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
