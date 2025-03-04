import { useRouter } from 'next/navigation';

import type { UseQueryOptions } from '@tanstack/react-query';
import { type QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';
import type { User } from '@/types/user';

export function authUserQueryOptions(
  router: ReturnType<typeof useRouter>,
): UseQueryOptions<User, Error, User, QueryKey> {
  return {
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/auth/me');
        return data.user;
      } catch (error: any) {
        // Redirect if the user is not authenticated
        if (error.response?.status === 401) {
          router.push('/login');
        }
        throw error;
      }
    },
    staleTime: Infinity, // Use staleTime for session data that doesn't change often
    gcTime: Infinity, // Prevent session data from being garbage collected
  };
}

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, error, isPending, isError, refetch } = useQuery<User>(
    authUserQueryOptions(router),
  );

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      router.push('/login');
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return {
    user: data,
    error,
    isPending,
    isError,
    logout,
    refetch,
  };
};
