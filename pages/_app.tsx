import type { AppProps } from 'next/app'
import Head from 'next/head'
import "../styles/globals.css";

const TITLE = "먼디 - 혼수 비교 견적 서비스";
const DESC = "혼수 최저가 구매, 발품 말고 먼디";
const URL = "https://mondi.kr";
const IMAGE = "https://mondi.kr/imgs/og.png";

const App = ({ Component, pageProps }: AppProps) => {
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
        <meta name="keywords" content="먼디,mondi,혼수,비교,견젹,발품,최저가" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App;