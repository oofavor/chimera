import { Button, Container, Input, styled } from '@nextui-org/react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { set, login, name, password, nameError, passwordError } = useLogin();

  return (
    <Container
      alignItems="center"
      justify="center"
      display="flex"
      direction="column"
      css={{ height: '100%' }}
    >
      <Form onSubmit={login}>
        <Input
          color="primary"
          labelPlaceholder="name"
          value={name}
          onChange={set('name')}
          bordered
          required
          fullWidth
          helperText={nameError}
          helperColor="error"
        />
        <Input.Password
          color="primary"
          labelPlaceholder="password"
          value={password}
          onChange={set('password')}
          bordered
          required
          fullWidth
          helperText={passwordError}
          helperColor="error"
        />
        <Button type="submit" ripple>
          Login
        </Button>
      </Form>
    </Container>
  );
};

const Form = styled('form', {
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  gap: '48px',
});

export default Login;
