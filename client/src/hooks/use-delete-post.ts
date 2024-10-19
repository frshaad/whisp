import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/api';
import { Post } from '@/types/post';

async function deletePost(postId: string) {
  try {
    const { data } = await api.delete(`/posts/${postId}`);
    return data.message;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

export function useDeletePost(post: Post) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deletePost(post._id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['posts', post.user.username],
      });
    },
  });

  return { handleDeletePost: mutate };
}
