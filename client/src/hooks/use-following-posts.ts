import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';
import type { Post } from '@/types/post';

type ReturnType = {
  status: string;
  posts: Post[];
};

export const useFollowingPosts = () => {
  const { data, error, isPending, isError } = useQuery<ReturnType>({
    queryKey: ['followingPosts'],
    queryFn: async () => {
      try {
        const response = await api.get('/posts/following');
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
    refetchOnWindowFocus: false,
  });

  return {
    posts: data?.posts,
    error,
    isPending,
    isError,
  };
};
