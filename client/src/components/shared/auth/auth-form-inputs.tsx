import type { UseFormReturn } from 'react-hook-form';

import RenderFormField from '@/components/shared/auth/render-form-field';
import type {
  LoginFormValues,
  SignupFormValues,
} from '@/lib/schema/auth-schema';

type Properties = {
  form:
    | UseFormReturn<SignupFormValues, any, undefined>
    | UseFormReturn<LoginFormValues, any, undefined>;
  type: 'login' | 'signup';
};

export default function AuthInputs({ type, form }: Properties) {
  if (type === 'login') {
    return (
      <div className="space-y-3">
        <RenderFormField
          control={form.control}
          label="Username"
          name="username"
          placeholder="johndoe"
          type="text"
        />
        <RenderFormField
          control={form.control}
          label="Password"
          name="password"
          type="password"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <RenderFormField
        control={form.control}
        label="Full Name"
        name="fullname"
        placeholder="John Doe"
        type="text"
      />
      <RenderFormField
        control={form.control}
        label="Username"
        name="username"
        placeholder="johndoe"
        type="text"
      />
      <RenderFormField
        control={form.control}
        label="Email"
        name="email"
        placeholder="johndoe@example.com"
        type="text"
      />
      <RenderFormField
        control={form.control}
        label="Password"
        name="password"
        type="password"
      />
      <RenderFormField
        control={form.control}
        label="Confirm Password"
        name="passwordConfirm"
        type="password"
      />
    </div>
  );
}
