'use client';

import { Eraser } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeletePost } from '@/hooks/use-delete-post';
import { Post } from '@/types/post';

type DeletePostProps = { post: Post };

export default function DeletePost({ post }: DeletePostProps) {
  const { handleDeletePost } = useDeletePost(post);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-2">
        <Eraser size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" asChild>
            <AlertDialogAction onClick={() => handleDeletePost()}>
              Remove the post
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
