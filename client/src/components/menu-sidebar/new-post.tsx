import { zodResolver } from '@hookform/resolvers/zod';
import { Dot, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/api';

const NewPostSchema = z
  .object({
    text: z
      .string()
      .max(160, {
        message: 'Post must not be longer than 160 characters.',
      })
      .optional(),
    img: z.any().optional(),
  })
  .refine((data) => data.text || data.img, {
    message: 'Post must have either text or an image.',
  });

export default function NewPost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof NewPostSchema>>({
    resolver: zodResolver(NewPostSchema),
  });

  const onSubmit = async (data: z.infer<typeof NewPostSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    if (data.text) formData.append('text', data.text);

    // Handle the image file conversion
    if (data.img && data.img.length > 0) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        formData.append('img', data.img[0]);

        try {
          // Use Axios (api.ts) to send the request
          const response = await api.post('/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.status === 201) {
            toast.success('Post created successfully!');
            form.reset();
            router.push('/');
          } else {
            toast.error('Failed to create post');
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
          setIsSubmitting(false);
        }
      };
      reader.readAsDataURL(data.img[0]); // Convert file to Base64
    } else {
      // Handle form submission without image
      try {
        const response = await api.post('/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          toast.success('Post created successfully!');
          form.reset();
          router.push('/');
        } else {
          toast.error('Failed to create post');
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
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
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
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
