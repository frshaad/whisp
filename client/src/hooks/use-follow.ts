import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';

const handleToggleFollow = async (userId: string) => {
  try {
    const response = await api.post(`/users/follow/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const useFollow = (username: string) => {
  const queryClient = useQueryClient();

  const { mutate: handleFollow, isPending: isFollowing } = useMutation({
    mutationFn: handleToggleFollow,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] }),
        queryClient.invalidateQueries({ queryKey: ['authUser'] }),
        queryClient.invalidateQueries({ queryKey: ['user', username] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { handleFollow, isFollowing };
};
