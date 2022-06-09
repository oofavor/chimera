import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

// this thing will redirect to login
// if user is not logged in
// It's done so we don't have to handle it in each page
export const RedirectMagician = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  return <>{children}</>;
};
