import { AuthActionResult } from '@/types/auth-actions';

import api from './api';

export const getAuthUser = async (): Promise<AuthActionResult> => {
  try {
    const { data } = await api.get('/auth/me');
    return { status: 'success', user: data.user };
  } catch (error: any) {
    if (error.response && error.response.data) {
      return {
        status: 'failed',
        message:
          error.response.data.message || 'Failed to get authenticated user.',
      };
    }

    return {
      status: 'failed',
      message: error.message || 'An unknown error occurred.',
    };
  }
};
