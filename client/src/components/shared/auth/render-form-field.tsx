import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type {
  LoginFormValues,
  SignupFormValues,
} from '@/lib/schema/auth-schema';

type FormFieldProperties = {
  name: keyof SignupFormValues | keyof LoginFormValues;
  label: string;
  type?: string;
  placeholder?: string;
  control: any;
};

export default function RenderFormField({
  name,
  label,
  type = 'text',
  placeholder,
  control,
}: FormFieldProperties) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
