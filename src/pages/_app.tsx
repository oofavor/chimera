import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '../contexts/user';
import { RedirectMagician } from '../components/RedirectMagician';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NextUIProvider>
          <RedirectMagician>
            <Component {...pageProps} />
          </RedirectMagician>
        </NextUIProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
