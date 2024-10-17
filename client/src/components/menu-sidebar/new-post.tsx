'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dot, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { useGetAuthUser } from '@/hooks/use-get-auth-user';
import api from '@/lib/api';
import { NewPostSchema, NewPostValues } from '@/lib/schema/post-schema';

export default function NewPost() {
  const authUser = useGetAuthUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewPostValues>({
    resolver: zodResolver(NewPostSchema),
  });

  const handleFormSubmit: SubmitHandler<NewPostValues> = async (data, e) => {
    e?.preventDefault();

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
          <Dot size={30} className="opacity-0" />
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
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="w-10/12 space-y-6"
            >
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="What is happening?!"
                        className="w-full resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-between">
                <div></div>
                <Button type="submit" disabled={isSubmitting}>
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
