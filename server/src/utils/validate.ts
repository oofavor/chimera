import User from '@models/user.model';
import { createError } from './createError';
import { SmashedPotato } from '@type/SmashedPotato';

const emailRegexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/;

const usernameRegexp = /^[A-Za-z][A-Za-z0-9_]{4,29}$/;

export const validateCreateUserBody = (user: any): User | SmashedPotato => {
  if (!user) return createError('Missing data to register user');

  if (!user.email) return createError('Missing email');
  if (!emailRegexp.test(user.email))
    return createError(`This email is not valid: ${user.email}`);

  if (!user.password) return createError('Missing password');
  if (!passwordRegexp.test(user.password))
    return createError(
      `This password is not valid: ${user.password}, required: 8 characters, 1 uppercase, 1 lowercase, 1 number`
    );

  if (!user.name) return createError('Missing name');
  if (!usernameRegexp.test(user.name)) return createError('Invalid username');

  return user;
};
