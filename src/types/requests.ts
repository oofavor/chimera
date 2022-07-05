import { User } from './models';

export interface ServerError {
  isError: true;
  error: any;
}

export interface UserResponse {
  user: User;
  token: string;
}


