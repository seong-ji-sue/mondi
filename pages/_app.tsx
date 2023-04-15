import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script';
import "../styles/globals.css";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GA_ID, pageview } from 'src/utils/gtag';

const TITLE = "서베이딜";
const DESC = "투표로 탄생하는 공동구매";
const URL = "";
const IMAGE = "";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  
   useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link href="/imgs/favicon.png" rel="icon" type="image/png"/>
        <link href="/imgs/favicon.png" rel="shortcut icon"/>
        <link href="/imgs/favicon.png" rel="apple-touch-icon"/>
        <meta name="robots" content="index,nofollow" />
        <meta name="apple-mobile-web-app-title" content={TITLE} />
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:url" content={URL} />
        <meta name="twitter:image" content={IMAGE} />
        <meta name="keywords" content="서베이딜,투표,공동구매" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default App;