import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signupAction } from '@/actions/signup-action';
import { SignupFormValues, signupSchema } from '@/lib/schema/auth-schema';

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

  const handleFormSubmit: SubmitHandler<SignupFormValues> = async (data, e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signupAction(data);

      if (result.status === 'success') {
        toast.success('User registered successfully!');
        router.replace('/');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Something went wrong during sign up.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, handleFormSubmit, isSubmitting };
};
