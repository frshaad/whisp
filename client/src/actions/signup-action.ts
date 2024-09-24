'use server';

import { signupSchema } from '@/lib/schema/auth-schema';
import { sleep } from '@/lib/utils/helper';

export type FormState = {
  message: string;
  errors?: Record<string, unknown>;
};

export async function signUpAction(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      message: 'Submission Failed',
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  await sleep(2);
}
