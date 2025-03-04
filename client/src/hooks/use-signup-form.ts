import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signupAction } from '@/actions/signup-action';
import type { SignupFormValues } from '@/lib/schema/auth-schema';
import { signupSchema } from '@/lib/schema/auth-schema';

export const useSignupForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleFormSubmit: SubmitHandler<SignupFormValues> = async (
    data,
    event,
  ) => {
    event?.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signupAction(data);

      if (result.status === 'success') {
        toast.success('User registered successfully!');
        router.replace('/');
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Something went wrong during sign up.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, handleFormSubmit, isSubmitting };
};
