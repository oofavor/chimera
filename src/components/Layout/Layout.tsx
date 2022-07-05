import { styled } from '@nextui-org/react';
import { useUser } from '../../hooks/useUser';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  
  return user ? (
    <Wrapper>
      <Sidebar />
      {children}
    </Wrapper>
  ) : (
    <>{children}</>
  );
};

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
});
