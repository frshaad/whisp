'use server';

import { cookies } from 'next/headers';

import api from '@/lib/api';
import { parseSetCookie } from '@/lib/parse-set-cookie';
import type { LoginFormValues } from '@/lib/schema/auth-schema';
import type {
  AuthActionResult,
  AuthSuccessResponse,
} from '@/types/auth-actions';

export const loginAction = async (
  data: LoginFormValues,
): Promise<AuthActionResult> => {
  try {
    const response = await api.post<AuthSuccessResponse>('/auth/login', data, {
      withCredentials: true,
    });

    if (response.status >= 200 && response.status < 300) {
      const cookieStore = await cookies();
      const setCookieHeader = response.headers['set-cookie'];

      if (setCookieHeader) {
        for (const cookie of setCookieHeader) {
          const { name, value, options } = parseSetCookie(cookie);

          cookieStore.set(name, value, options);
        }
      }

      return response.data;
    }
    return {
      status: 'failed',
      message: 'Login failed. Please check your credentials.',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        status: 'failed',
        message: `${error.name} in login action: ${error.message}`,
      };
    } else {
      return {
        status: 'failed',
        message: `Unexpected error type in login action: ${error}`,
      };
    }
  }
};
