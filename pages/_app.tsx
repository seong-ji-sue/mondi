import type { AppProps } from 'next/app'
import Head from 'next/head'
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>먼디</title>
        <link href="/imgs/favicon.png" rel="icon" type="image/png"/>
        <link href="/imgs/favicon.png" rel="shortcut icon"/>
        <link href="/imgs/favicon.png" rel="apple-touch-icon"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App;