import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { loginAction } from '@/actions/login-action';
import { LoginFormValues, loginSchema } from '@/lib/schema/auth-schema';

export const useLoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const handleFormSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await loginAction(data);
      if (result.status === 'success') {
        toast.success('Logged in successfully!');
        router.replace('/');
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, handleFormSubmit, isSubmitting };
};
