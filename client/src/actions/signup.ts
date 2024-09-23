'use server';

import { signupSchema } from '@/lib/schema/auth-schema';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function signUpAction(prevState: FormState, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return {
      message: 'Invalid form data',
      fields,
      issues: parsedData.error.issues.map((issue) => issue.message),
    };
  }

  return { message: 'User registered' };
}
