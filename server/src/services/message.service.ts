import { createError } from '@utils/createError';
import prisma from '../../prisma/client';
import { serviceHandler } from '@utils/service';
import { Message } from '@type/models';

export const getMessageByID = (id: string) =>
  serviceHandler(async () => {
    const message = await prisma.message.findFirst({ where: { id } });
    return message || createError('Message not found');
  });

export const createMessage = async (message: Message) =>
  serviceHandler(async () => {
    const createdMessage = await prisma.message.create({
      data: message,
    });
    return createdMessage;
  });
