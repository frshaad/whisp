'use client';

import AuthInputs from '@/components/shared/auth/auth-form-inputs';
import SubmitButton from '@/components/shared/auth/auth-submit-button';
import { Form } from '@/components/ui/form';
import { useSignupForm } from '@/hooks/use-signup-form';

export default function SignUpForm() {
  const { form, handleFormSubmit, isSubmitting } = useSignupForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <AuthInputs form={form} type="signup" />
        <div className="space-y-4">
          <SubmitButton disabled={isSubmitting} label="Create an account" />
        </div>
      </form>
    </Form>
  );
}
