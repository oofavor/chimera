import prisma from '../../prisma/client';
import { createError } from '@utils/createError';
import { User } from '@type/models';
import { serviceHandler } from '@utils/service';
import { exclude } from '@utils/format';

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

export const getUsersByName = (name: string) =>
  serviceHandler(async () => {
    const users = await prisma.user.findMany({
      where: { name: { contains: name } },
    });
    return users.map((user) => exclude(user, 'password'));
  });

export const getUserSafe = (name: string) =>
  serviceHandler(async () => {
    const foundUser = await prisma.user.findUnique({
      where: { name },
    });
    return (
      (foundUser && exclude(foundUser, 'password')) ||
      createError('User not found')
    );
  });
