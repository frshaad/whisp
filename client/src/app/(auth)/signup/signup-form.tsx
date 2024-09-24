'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';

import { FormState, signUpAction } from '@/actions/signup';
import { Form } from '@/components/ui/form';
import { SignupFormValues, signupSchema } from '@/lib/schema/auth-schema';

import SignUpInputs from './signup-form-inputs';
import SSOAuthButtons from './sso-auth-buttons';
import SubmitButton from './submit-button';

const initialState: FormState = { message: '' };

export default function SignUpForm() {
  const [, formAction] = useFormState(signUpAction, initialState);
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
    },
  });

  const handleFormSubmit = async (data: SignupFormValues) => {
    const formData = new FormData();
    formData.append('fullname', data.fullname);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);

    await formAction(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <SignUpInputs form={form} />
        <div className="space-y-4">
          <SubmitButton />
          <SSOAuthButtons />
        </div>
      </form>
    </Form>
  );
}
