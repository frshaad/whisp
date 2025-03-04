'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dot, PenLine } from 'lucide-react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import UserAvatar from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuthUser } from '@/hooks/use-auth-user';
import api from '@/lib/api';
import type { NewPostValues } from '@/lib/schema/post-schema';
import { NewPostSchema } from '@/lib/schema/post-schema';

export default function NewPost() {
  const { user: authUser } = useAuthUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewPostValues>({
    resolver: zodResolver(NewPostSchema),
  });

  const handleFormSubmit: SubmitHandler<NewPostValues> = async (
    data,
    event,
  ) => {
    event?.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await api.post('/posts', data);

      if (response.data?.status === 'success') {
        toast.success('Post created successfully!');
        form.reset();
        router.refresh();
      } else {
        toast.error(response.data?.message || 'Failed to create post');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Something went wrong during creating post',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex items-center">
          <Dot className="opacity-0" size={30} />
          <Button className="gap-3">
            <PenLine size={22} />
            <span>New Post</span>
          </Button>
        </li>
      </DialogTrigger>
      <DialogContent className="max-w-xl space-y-4">
        <DialogHeader>
          <DialogTitle>Speak your mind</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <UserAvatar
            fullname={authUser?.fullname || ''}
            profileImg={authUser?.profileImg}
          />
          <Form {...form}>
            <form
              className="w-10/12 space-y-6"
              onSubmit={form.handleSubmit(handleFormSubmit)}
            >
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="w-full resize-none"
                        placeholder="What is happening?!"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-between">
                <div />
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
