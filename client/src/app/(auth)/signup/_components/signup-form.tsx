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
import { SignupFormValues, signupSchema } from '@/lib/schema/auth-schema';

export default function SignUpForm() {
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

    try {
      setIsSubmitting(true);

      const response = await api.post('/auth/signup', data);

      if (response.data?.status === 'success') {
        toast.success('User registered successfully!');

        setTimeout(() => {
          router.replace('/');
        }, 1000);
      } else {
        toast.error(
          response.data?.message || 'Sign Up failed. Please try again.',
        );
      }
    } catch (error) {
      toast.error('Something went wrong during sign up.');
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
        <AuthInputs form={form} type="signup" />
        <div className="space-y-4">
          <SubmitButton disabled={isSubmitting} label="Create an account" />
          {/* TODO: SSO setup  */}
          {/* <SSOAuthButtons /> */}
        </div>
      </form>
    </Form>
  );
}
