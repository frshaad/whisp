import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/api';
import type { Post } from '@/types/post';

import { useAuthUser } from './use-auth-user';

export function useLikePost(post: Post) {
  const queryClient = useQueryClient();
  const { user } = useAuthUser();

  const { mutate } = useMutation({
    async mutationFn() {
      try {
        const { data } = await api.post(`/posts/like/${post._id}`);
        return data.message;
      } catch (error: unknown) {
        const error_ =
          error instanceof Error
            ? new Error(error.message)
            : new Error('An unknown error occurred.');
        throw error_;
      }
    },
    async onMutate() {
      await queryClient.cancelQueries({
        queryKey: ['posts', post.user.username],
      });

      const previousPosts = queryClient.getQueryData<Post[]>([
        'posts',
        post.user.username,
      ]);

      queryClient.setQueryData(
        ['posts', post.user.username],
        (oldPosts: Post[]) => {
          const targetPost = oldPosts.find((item) => item._id === post._id);

          if (!user || !targetPost) {
            return oldPosts;
          }

          const isAlreadyLiked = targetPost.likes.includes(user._id);

          return oldPosts.map((item) =>
            item._id === targetPost._id
              ? {
                  ...item,
                  likes: isAlreadyLiked
                    ? targetPost.likes.filter((id) => id !== user._id) // Unlike
                    : [...targetPost.likes, user._id], // Like
                }
              : item
          );
        }
      );

      return { previousPosts };
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['posts', post.user.username],
      });
      queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['followingPosts'] });
    },

    onError(error, _, context) {
      console.log(error.message);
      queryClient.setQueryData(
        ['posts', post.user.username],
        context?.previousPosts
      );
    },
  });

  return { handleLikePost: mutate };
}
