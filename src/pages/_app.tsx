import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '../contexts/user';
import { globalCss } from '@nextui-org/react';
import { Layout } from '../components/Layout';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  globalCss({
    body: { height: '100%' },
    html: { height: '100%' },
    '#__next': { height: '100%' },
    '#__next > *': { height: '100%' },
  })();

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default MyApp;
