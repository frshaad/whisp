import { UseFormReturn } from 'react-hook-form';

import RenderFormField from './RenderFormField';

type Props = {
  form: UseFormReturn<
    {
      fullname: string;
      username: string;
      email: string;
      password: string;
    },
    any,
    undefined
  >;
};

export default function SignUpInputs({ form }: Props) {
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
    </div>
  );
}
