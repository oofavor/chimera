import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user';

export const useUser = () => {
  const ctx = useContext(UserContext);

  return ctx;
};
