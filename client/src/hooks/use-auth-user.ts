import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import api from '@/lib/api';
import { User } from '@/types/user';

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, error, isPending, isError, refetch } = useQuery<User>({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/auth/me');
        return data.user;
      } catch (err: any) {
        // Redirect if the user is not authenticated
        if (err.response?.status === 401) {
          router.push('/login');
        }
        throw err;
      }
    },
    staleTime: Infinity, // Use staleTime for session data that doesn't change often
    gcTime: Infinity, // Prevent session data from being garbage collected
    retry: false, // Do not retry failed requests
  });

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      router.push('/login');
    } catch (err: any) {
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
