'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { FormState, signUpAction } from '@/actions/signup';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SignupFormValues, signupSchema } from '@/lib/schema/auth-schema';

import RenderFormField from './RenderFormField';
import SubmitButton from './submit-button';

const initialState: FormState = { message: '' };

export default function SignupPage() {
  const [formState, formAction] = useFormState(signUpAction, initialState);
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: 'John',
      username: 'jdoe',
      email: 'jdoe@gmail.com',
      password: '12345678',

      // fullname: '',
      // username: '',
      // email: '',
      // password: '',

      // ...(state.fields ?? {}),
    },
  });

  const handleFormSubmit = async (data: SignupFormValues) => {
    const formData = new FormData();
    formData.append('fullname', data.fullname);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);

    await formAction(formData);
    console.log('done');
  };

  return (
    <div className="mx-auto grid w-[400px] gap-6">
      <Form {...form}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="space-y-3">
            <RenderFormField
              name="fullname"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              control={form.control}
            />
            <RenderFormField
              name="username"
              label="Username"
              type="text"
              placeholder="johndoe"
              control={form.control}
            />
            <RenderFormField
              name="email"
              label="Email"
              type="text"
              placeholder="johndoe@example.com"
              control={form.control}
            />
            <RenderFormField
              name="password"
              label="Password"
              type="password"
              control={form.control}
            />
          </div>
          <div className="space-y-4">
            <SubmitButton />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex w-full items-center gap-2"
              >
                <FaGoogle />
                Google
              </Button>
              <Button
                variant="outline"
                className="flex w-full items-center gap-2"
              >
                <FaGithub />
                GitHub
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}
