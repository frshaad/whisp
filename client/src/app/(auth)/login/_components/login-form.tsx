'use client';

import AuthInputs from '@/components/shared/auth/auth-form-inputs';
import SubmitButton from '@/components/shared/auth/auth-submit-button';
import { Form } from '@/components/ui/form';
import { useLoginForm } from '@/hooks/use-login-form';

export default function LoginForm() {
  const { form, handleFormSubmit, isSubmitting } = useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <AuthInputs form={form} type="login" />
        <div className="space-y-4">
          <SubmitButton disabled={isSubmitting} label="Log In" />
        </div>
      </form>
    </Form>
  );
}
