import { createError } from './createError';
import { SmashedPotato } from '@type/SmashedPotato';
import { User } from '@type/models';

const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/;

const usernameRegexp = /^[A-Za-z][A-Za-z0-9_]{4,29}$/;

export const validateCreateUserBody = (user: any): User | SmashedPotato => {
  if (!user) return createError('Missing data to register user');

  if (!user.name) return createError('Missing name');
  if (!user.password) return createError('Missing password');

  if (!passwordRegexp.test(user.password))
    return createError(
      `This password is not valid: ${user.password}, required: 8 characters, 1 uppercase, 1 lowercase, 1 number`
    );

  if (!usernameRegexp.test(user.name)) return createError('Invalid username');

  return user;
};

export const validateLoginUserBody = (user: any): User | SmashedPotato => {
  if (!user) return createError('Missing data to register user');

  if (!user.name) return createError('Missing username');
  if (!user.password) return createError('Missing password');

  if (user.name && !usernameRegexp.test(user.name))
    return createError('Invalid username');

  if (!passwordRegexp.test(user.password))
    return createError(
      `This password is not valid: ${user.password}, required: 8 characters, 1 uppercase, 1 lowercase, 1 number`
    );

  return user;
};
