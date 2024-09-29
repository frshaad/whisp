'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import api from '@/lib/api';
import { User } from '@/types/user';

type ReturnType = {
  status: string;
  user: User;
};

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, error, isLoading, isError } = useQuery<ReturnType>({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/me');
        return response.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          // If the user is not authenticated, redirect to login
          toast.error('User not authenticated. Redirecting to login.');
          router.push('/login');
        } else {
          toast.error('Failed to fetch user data. Please try again.');
        }
        throw err;
      }
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Successfully logged out');
      router.push('/login');
    } catch (err: any) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return {
    user: data?.user,
    error,
    isLoading,
    isError,
    logout,
  };
};
