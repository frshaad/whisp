import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';
import type { User } from '@/types/user';

export type ReturnType = {
  status: string;
  suggestedUsers: User[];
};

export const useSuggestedUsers = () => {
  const { data, error, isPending, isError } = useQuery<ReturnType>({
    queryKey: ['suggestedUser'],
    queryFn: async () => {
      try {
        const response = await api.get('/users/suggested');
        return response.data;
      } catch (error_: any) {
        if (error_.response?.status === 401) {
          toast.error('User not authenticated. Redirecting to login.');
        } else {
          toast.error('Failed to fetch feed posts. Please try again.');
        }
        throw error_;
      }
    },
  });

  return {
    suggestedUsers: data?.suggestedUsers,
    error,
    isPending,
    isError,
  };
};
