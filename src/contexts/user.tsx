import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/models';
import axios from 'axios';
import { CurrentResponse } from '../types/requests';

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
  

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    axios.defaults.headers.common['Authorization'] = token
    axios.post<CurrentResponse>('/api/users/current').then((res) => {
      if ('isError' in res.data) return;
      setUser(res.data);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
