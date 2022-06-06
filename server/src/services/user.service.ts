import prisma from '../../prisma/client';
import { createError } from '@utils/createError';
import { User } from '@type/models';
import { serviceHandler } from '@utils/service';

type UserQuery = { name: string } | { id: string };

export const getUser = (query: UserQuery) =>
  serviceHandler(async () => {
    const foundUser = await prisma.user.findFirst({
      where: query,
    });
    return foundUser || createError('User not found');
  });

export const createUser = (user: User) =>
  serviceHandler(async () => {
    const createdUser = await prisma.user.create({ data: user });
    return createdUser;
  });

export const changeUser = (username: string, options: User) =>
  serviceHandler(async () => {
    const changedUser = await prisma.user.update({
      where: { name: username },
      data: options,
    });
    return changedUser;
  });
