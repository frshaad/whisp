import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginFormValues, SignupFormValues } from '@/lib/schema/auth-schema';

type FormFieldProps = {
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
}: FormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
