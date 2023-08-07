import type { AppProps } from 'next/app';
import '@/msw/server';
import '@/styles/global-reset.scss';
import RQ_HydrateProvider from '@/components/providers/RQ_HydrateProvider';
import SC_DefaultThemeProvider from '@/components/providers/SC_DefaultThemeProvider';
import initMocks from '@/msw';

/**
 * This Project is For test
 * so always using mock
 */
if (process.env.NEXT_PUBLIC_API_MOCKING === 'DEV') initMocks();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RQ_HydrateProvider dehydratedState={pageProps.dehydratedState}>
        <SC_DefaultThemeProvider>
          <Component {...pageProps} />
        </SC_DefaultThemeProvider>
      </RQ_HydrateProvider>
    </>
  );
}
