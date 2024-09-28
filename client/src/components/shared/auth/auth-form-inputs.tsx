import { UseFormReturn } from 'react-hook-form';

import RenderFormField from '@/components/shared/auth/RenderFormField';
import { LoginFormValues, SignupFormValues } from '@/lib/schema/auth-schema';

type Props = {
  form:
    | UseFormReturn<SignupFormValues, any, undefined>
    | UseFormReturn<LoginFormValues, any, undefined>;
  type: 'login' | 'signup';
};

export default function AuthInputs({ type, form }: Props) {
  if (type === 'login') {
    return (
      <div className="space-y-3">
        <RenderFormField
          name="username"
          label="Username"
          type="text"
          placeholder="johndoe"
          control={form.control}
        />
        <RenderFormField
          name="password"
          label="Password"
          type="password"
          control={form.control}
        />
      </div>
    );
  }

  return (
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
      <RenderFormField
        name="passwordConfirm"
        label="Confirm Password"
        type="password"
        control={form.control}
      />
    </div>
  );
}
