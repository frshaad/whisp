import { User } from '@/types/user';

import api from './api';

export const getUser = async (): Promise<User> => {
  const { data } = await api.get('/auth/me');
  return data;
};
