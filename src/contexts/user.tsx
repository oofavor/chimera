import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/models';
import axios, { AxiosError } from 'axios';
import { Error } from '../types/requests';
import { Container, Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { parseCookie } from '../utils';

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
  const [isRequesting, setIsRequesting] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = parseCookie(document.cookie).token;
    if (!token) return setIsRequesting(false);

    axios.defaults.headers.common['Authorization'] = token;
    axios
      .post<User>('/api/users/current')
      .then((res) => {
        setUser(res.data);
      })
      .catch((e: AxiosError | Error) => {
        if (!axios.isAxiosError(e)) return;
        axios.defaults.headers.common['Authorization'] = '';
      })
      .finally(() => setIsRequesting(false));
  }, []);

  useEffect(() => {
    if (user && router.pathname === '/login') router.push('/');
    if (!user && router.pathname !== '/login' && !isRequesting)
      router.push('/login');
  }, [user, router, isRequesting]);

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
