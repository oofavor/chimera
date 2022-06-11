import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { FormElement } from '@nextui-org/react';
import { Error, UserResponse } from '../types/requests';
import { useUser } from './useUser';
import { encodeCookie, parseCookie } from '../utils';

const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/;
const usernameRegexp = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;

export const useLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setUser } = useUser();

  useEffect(() => {
    const token = parseCookie(document.cookie).token;
    if (!token) return;

    axios.defaults.headers.common['Authorization'] = token;
  }, []);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleError()) return;
    const request = await axios
      .post<UserResponse>('/api/users/login', {
        name,
        password,
      })
      .catch((e: AxiosError | Error) => {
        if (!axios.isAxiosError(e)) return;
        setNameError('User not found');
      });

    if (!request) return;
    axios.defaults.headers.common['Authorization'] = request.data.token;
    console.log(encodeCookie({ token: request.data.token }));
    console.log(
      encodeCookie({
        ...parseCookie(document.cookie),
        token: request.data.token,
      })
    );
    document.cookie = encodeCookie({
      ...parseCookie(document.cookie),
      token: request.data.token,
    });
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

  const handleError = () => {
    if (passwordRegexp.test(password) && usernameRegexp.test(name)) {
      setNameError('');
      setPasswordError('');
      return false;
    }
    if (!usernameRegexp.test(name)) setNameError('Invalid name');
    if (!passwordRegexp.test(password)) setPasswordError('Insecure password');
    return true;
  };

  return { name, password, login, set, nameError, passwordError };
};
