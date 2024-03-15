import "../styles/globals.scss";

import React, {FunctionComponent, useEffect} from "react";
import Script from "next/script";
import { useRouter } from "next/router";

import * as gtag from "../lib/gtag";

interface AppProps {
    readonly Component: any;
}

const MyApp: FunctionComponent<AppProps> = ({ Component, ...pageProps}) => {

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        id="ga"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-733EGJQ16E`}
      />
      <Script strategy="lazyOnload" id="ga2">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-733EGJQ16E', {
                  page_path: window.location.pathname,
              });
          `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
