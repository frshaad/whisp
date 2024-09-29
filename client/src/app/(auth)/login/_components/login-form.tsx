'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthInputs from '@/components/shared/auth/auth-form-inputs';
import SubmitButton from '@/components/shared/auth/auth-submit-button';
import { Form } from '@/components/ui/form';
import api from '@/lib/api';
import { LoginFormValues, loginSchema } from '@/lib/schema/auth-schema';

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleFormSubmit: SubmitHandler<LoginFormValues> = async (data, e) => {
    e?.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await api.post('/auth/login', data);

      if (response.data?.status === 'success') {
        toast.success('Logged in successfully!');

        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        toast.error(
          response.data?.message || 'Login failed. Please try again.',
        );
      }
    } catch (error) {
      toast.error('Something went wrong during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <AuthInputs form={form} type="login" />
        <div className="space-y-4">
          <SubmitButton disabled={isSubmitting} label="Log In" />
          {/* TODO: SSO setup  */}
          {/* <SSOAuthButtons /> */}
        </div>
      </form>
    </Form>
  );
}