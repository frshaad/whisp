'use client';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';
import { User } from '@/types/user';

type ReturnType = {
  status: string;
  user: User;
};

export const useUser = (username: string) => {
  const { data, error, isLoading, isError } = useQuery<ReturnType>({
    queryKey: ['user', username],
    queryFn: async () => {
      try {
        const response = await api.get(`/users/profile/${username}`);
        return response.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          // If the user is not authenticated, redirect to login
          toast.error('User not authenticated. Redirecting to login.');
        } else {
          toast.error('Failed to fetch user data. Please try again.');
        }
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  return {
    user: data?.user,
    error,
    isLoading,
    isError,
  };
};
