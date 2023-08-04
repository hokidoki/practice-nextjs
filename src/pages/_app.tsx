import type { AppProps } from 'next/app';
import '@/styles/global-reset.scss';
import RQ_HydrateProvider from '@/components/providers/RQ_HydrateProvider';
import SC_DefaultThemeProvider from '@/components/providers/SC_DefaultThemeProvider';

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
