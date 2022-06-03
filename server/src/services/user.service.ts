import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import prisma from '../../prisma/client';
import User from '@models/user.model';
import { createError } from '@utils/createError';

type UserQuery = { name: string } | { id: string } | { email: string };
export const getUser = async (query: UserQuery) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: query,
    });
    return foundUser || { isError: true };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
    }
    return createError(e);
  }
};

export const createUser = async (user: User) => {
  try {
    const createdUser = await prisma.user.create({ data: user });
    return createdUser;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
    }
    return createError(e);
  }
};

export const changeUser = async (username: string, options: User) => {
  try {
    const changedUser = await prisma.user.update({
      where: { name: username },
      data: options,
    });
    return changedUser;
  } catch (e) {
    return createError(e);
  }
};

export const getMessages = async (id: string) => {
  try {
    const messages = await prisma.user
      .findFirst({
        where: { id },
      })
      .messages();
    return messages;
  } catch (e) {
    return createError(e);
  }
};
