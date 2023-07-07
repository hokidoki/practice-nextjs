import "../styles/globals.scss";
import { DefaultSeo } from "next-seo";
import SEO from "../../seo.config";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />;
    </>
  );
}
