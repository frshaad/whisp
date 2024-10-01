import { z } from 'zod';

export const NewPostSchema = z
  .object({
    text: z
      .string()
      .max(160, {
        message: 'Post must not be longer than 160 characters.',
      })
      .optional(),
    img: z.any().optional(),
  })
  .refine((data) => data.text || data.img, {
    message: 'Post must have either text or an image.',
  });

export type NewPostValues = z.infer<typeof NewPostSchema>;
