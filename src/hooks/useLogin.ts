import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { User } from '../types/models';
import { FormElement } from '@nextui-org/react';
import { LoginResponse } from '../types/requests';
import { useUser } from './useUser';

export const useLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    axios.defaults.headers.common['Authorization'] = token;
  }, []);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request = await axios.post<LoginResponse>('/api/users/login', {
      name,
      password,
    });
    if ('isError' in request.data) {
      console.error(request.data.error);
      return;
    }
    axios.defaults.headers.common['Authorization'] = request.data.token;
    window.localStorage.setItem('token', request.data.token);
    setUser(request.data.user);
  };

  const set = (type: 'name' | 'password') => (e: ChangeEvent<FormElement>) => {
    switch (type) {
      case 'name':
        setName(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  };

  return { name, password, login, set };
};
