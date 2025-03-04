import type mongoose from 'mongoose';

import type { UserType } from '../../schemas/user.schema';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserType;
      userId?: mongoose.Schema.Types.ObjectId;
    }
  }
}
