import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

const zodMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({ status: 'failed', errors });
    }

    next();
  };

export default zodMiddleware;
