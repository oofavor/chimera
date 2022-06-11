import { User } from './models';

export type Error = {
  isError: true;
  error: any;
};

export type UserResponse = {
  user: User;
  token: string;
};
