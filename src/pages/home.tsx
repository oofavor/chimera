import { Button, Input } from '@nextui-org/react';
import { useLogin } from '../hooks/useLogin';
import { useUser } from '../hooks/useUser';

const Home = () => {
  const { set, login, name, password } = useLogin();
  const { user } = useUser();

  return (
    <div>
      {!user ? (
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
      ) : (
        <div />
      )}
    </div>
  );
};

export default Home;
