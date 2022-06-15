import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SmashedPotato } from '@type/SmashedPotato';
import { createError } from './createError';

export const serviceHandler = async <T extends () => any>(
  fetch: T
): Promise<SmashedPotato | Awaited<ReturnType<T>>> => {
  try {
    const data = await fetch();
    return data;
  } catch (e) {
    // With the assumption there's only 1 unique constrain
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
      return createError('This username already exists');
    console.log(e);
    return createError('Internal server error');
  }
};
