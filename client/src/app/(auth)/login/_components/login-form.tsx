'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { loginAction } from '@/actions/login-action';
import AuthInputs from '@/components/shared/auth/auth-form-inputs';
import SubmitButton from '@/components/shared/auth/auth-submit-button';
import { Form } from '@/components/ui/form';
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

      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);

      const response = await loginAction(formData);

      if (response.message === 'Login successful! Redirecting...') {
        toast.success('Logged in successfully!');
        router.push('/');
      } else {
        toast.error(response.message);
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
