'use client';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';
import type { Post } from '@/types/post';

export const useUserPosts = (username: string) => {
  const { data, error, isPending, isError } = useQuery<Post[]>({
    queryKey: ['posts', username],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/posts/${username}`);
        return data.posts;
      } catch (error_: any) {
        if (error_.response?.status === 401) {
          // If the user is not authenticated, redirect to login
          toast.error('User not authenticated. Redirecting to login.');
        } else {
          toast.error('Failed to fetch user posts. Please try again.');
        }
        throw error_;
      }
    },
    refetchOnWindowFocus: false,
  });

  return {
    posts: data,
    error,
    isPending,
    isError,
  };
};
