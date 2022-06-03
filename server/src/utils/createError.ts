import { SmashedPotato } from '@type/SmashedPotato';

export const createError = (error: any): SmashedPotato => {
  return { isError: true, error };
};
