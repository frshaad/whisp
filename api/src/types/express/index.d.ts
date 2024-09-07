import mongoose from 'mongoose';
import { UserType } from '../../schemas/user.schema';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserType;
      userId?: mongoose.Schema.Types.ObjectId;
    }
  }
}
