'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signUpAction } from '@/actions/signup-action';
import { Form } from '@/components/ui/form';
import { SignupFormValues, signupSchema } from '@/lib/schema/auth-schema';

import SignUpInputs from './signup-form-inputs';
import SSOAuthButtons from './sso-auth-buttons';
import SubmitButton from './submit-button';

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

      await signUpAction(formData);
      setIsSubmitting(false);
      toast.success('User registered! 🎉', {
        action: {
          label: 'Log In',
          onClick: () => router.push('/login'),
        },
      });
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <SignUpInputs form={form} />
        <div className="space-y-4">
          <SubmitButton disabled={isSubmitting} />
          <SSOAuthButtons />
        </div>
      </form>
    </Form>
  );
}
