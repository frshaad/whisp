import { User } from './user';

export type AuthSuccessResponse = {
  status: 'success';
  user: User;
};

export type AuthErrorResponse = {
  status: 'failed';
  message: string;
};

export type AuthActionResult = AuthSuccessResponse | AuthErrorResponse;
