import type { AppProps } from "next/app";
import "@/styles/global-reset.scss";
import theme from "@/styles/Theme";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}
