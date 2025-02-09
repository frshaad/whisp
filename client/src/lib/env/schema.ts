import { z } from 'zod';

export const environmentSchema = z.object({
  // NODE_ENV: z.enum(['development', 'production']),
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export type Environment = z.infer<typeof environmentSchema>;
