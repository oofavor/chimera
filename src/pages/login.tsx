import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useUser } from '../hooks/useUser';

const Login = () => {
  const { set, login, name, password } = useLogin();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/home');
  }, [user]);
  
  return (
    <div>
      <form onSubmit={login}>
        <Input
          label="Name"
          placeholder="name"
          value={name}
          onChange={set('name')}
        />
        <Input
          label="password"
          placeholder="password"
          value={password}
          onChange={set('password')}
        />
        <Button type="submit" ripple>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
