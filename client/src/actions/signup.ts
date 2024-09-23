'use server';

import { signupSchema } from '@/lib/schema/auth-schema';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

// Validation function
function validateSignupData(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    const fields: Record<string, string> = {};
    for (const key of formData.keys()) {
      const value = formData.get(key);
      fields[key] = typeof value === 'string' ? value : '';
    }

    return {
      valid: false,
      fields,
      issues: parsedData.error.issues.map((issue) => issue.message),
    };
  }

  return { valid: true, data: parsedData.data };
}

// Main signup action
export async function signUpAction(prevState: FormState, formData: FormData) {
  // Use validateSignupData to handle validation
  const validation = validateSignupData(formData);

  if (!validation.valid) {
    return {
      message: 'Invalid form data',
      fields: validation.fields,
      issues: validation.issues,
    };
  }

  // At this point, data is valid
  return { message: 'User registered' };
}
