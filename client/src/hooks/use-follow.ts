import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import api from '@/lib/api';
import { User } from '@/types/user';

async function handleToggleFollow(userId: string) {
  try {
    const { data } = await api.post(`/users/follow/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function useFollow(username: string) {
  const queryClient = useQueryClient();

  const { mutate: handleFollow } = useMutation({
    mutationFn: handleToggleFollow,

    async onMutate(userId) {
      await queryClient.cancelQueries({ queryKey: ['authUser'] });

      const previousAuthUser = queryClient.getQueryData<User>(['authUser']);

      queryClient.setQueryData(['authUser'], (oldAuthUser: User) => ({
        ...oldAuthUser,
        following: oldAuthUser.following.includes(userId)
          ? oldAuthUser.following.filter((id) => id !== userId)
          : [...oldAuthUser.following, userId],
      }));

      return { previousAuthUser };
    },

    onError(error, _, context) {
      console.log(error.message);
      toast.error('Failed to follow/unfollow. Rolling back...');
      queryClient.setQueryData(['authUser'], context?.previousAuthUser);
    },

    onSuccess() {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] }),
        queryClient.invalidateQueries({ queryKey: ['authUser'] }),
        queryClient.invalidateQueries({ queryKey: ['user', username] }),
      ]);
    },
  });

  return { handleFollow };
}
