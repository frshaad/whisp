import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';
import { Post } from '@/types/post';

type ReturnType = {
  status: string;
  posts: Post[];
};

export const useFeedPosts = () => {
  const { data, error, isLoading, isError } = useQuery<ReturnType>({
    queryKey: ['feedPosts'],
    queryFn: async () => {
      try {
        const response = await api.get('/feed');
        return response.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          toast.error('User not authenticated. Redirecting to login.');
        } else {
          toast.error('Failed to fetch feed posts. Please try again.');
        }
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  return {
    posts: data?.posts,
    error,
    isLoading,
    isError,
  };
};
