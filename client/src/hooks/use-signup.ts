'use client';

import { useState } from 'react';

import api from '@/lib/api';
import { signupSchema } from '@/lib/schema/auth-schema';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export default function useSignUp() {
  const [formState, setFormState] = useState<FormState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUpAction = async (formData: FormData) => {
    // Validate on client side using Zod schema
    const parsedData = signupSchema.safeParse(Object.fromEntries(formData));

    if (!parsedData.success) {
      setFormState({
        message: 'Validation failed',
        fields: Object.fromEntries(formData) as Record<string, string>,
        issues: parsedData.error.issues.map((issue) => issue.message),
      });
      return;
    }

    try {
      setIsLoading(true); // Set loading state
      await api.post('/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Necessary for form data
      });

      setFormState({
        message: 'User registered successfully',
        fields: {},
        issues: [],
      });
    } catch (error) {
      setFormState({
        message: 'Failed to register',
        fields: Object.fromEntries(formData) as Record<string, string>,
        issues: error.response?.data?.message
          ? [error.response.data.message]
          : ['Unknown error occurred'],
      });
    } finally {
      setIsLoading(false); // Unset loading state
    }
  };

  return { formState, isLoading, signUpAction };
}
