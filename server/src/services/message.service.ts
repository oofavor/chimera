import { createError } from '@utils/createError';
import prisma from '../../prisma/client';
import Message from '@models/message.model';

export const getMessageByID = async (id: string) => {
  try {
    const message = await prisma.message.findFirst({ where: { id } });
    return message || createError('Message not found');
  } catch (e) {
    return createError(e);
  }
};

export const createMessage = async (message: Message) => {
  try {
    const createdMessage = await prisma.message.create({
      data: message,
    });
    return createdMessage;
  } catch (e) {
    return createError(e);
  }
};
