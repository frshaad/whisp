'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signUpAction } from '@/actions/signup-action';
import AuthInputs from '@/components/shared/auth/auth-form-inputs';
import SubmitButton from '@/components/shared/auth/auth-submit-button';
import { Form } from '@/components/ui/form';
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

      const formData = new FormData();
      formData.append('fullname', data.fullname);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('passwordConfirm', data.passwordConfirm);

      const result = await signUpAction(formData);
      setIsSubmitting(false);

      if (result.errors) {
        toast.error(result.message);
      } else {
        toast.success(result.message, {
          action: {
            label: 'Log In',
            onClick: () => router.push('/login'),
          },
        });
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error('An unexpected error occurred.');
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
