import { User } from './models';

export type Error = {
  isError: true;
  error: any;
};

export type LoginResponse =
  | {
      user: User;
      token: string;
    }
  | Error;

export type RegisterResponse = LoginResponse;

export type CurrentResponse = User | Error;
