import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/models';
import axios, { AxiosError } from 'axios';
import {  Error } from '../types/requests';
import { Container, Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';

type UserContext = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && router.pathname === '/login') router.push('/');
    if (!user && router.pathname !== '/login') router.push('/login');
  }, [user, router]);
  
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    axios.defaults.headers.common['Authorization'] = token;
    setIsRequesting(true);

    axios
      .post<User>('/api/users/current')
      .then((res) => setUser(res.data))
      .catch((e: AxiosError | Error) => {
        if (!axios.isAxiosError(e)) return;
        axios.defaults.headers.common['Authorization'] = '';
      })
      .finally(() => setIsRequesting(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {isRequesting ? (
        <Container
          alignItems="center"
          justify="center"
          display="flex"
          css={{ height: '100%' }}
        >
          <Loading />
        </Container>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
