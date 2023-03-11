import { AlertModal } from '@components/Modal';
import useAppStore from '@stores/app';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const alertMessage = useAppStore(state => state.alertMessage);
  const router = useRouter();

  useEffect(() => {
    useAppStore.setState({ alertMessage: "" });
  }, [router.pathname])

  return (
    <>
      <Head>
        <title>먼디-생활 필수 서비스 플랫폼</title>
      </Head>
      {alertMessage &&
        <AlertModal
          onClose={() => useAppStore.setState({ alertMessage: "" })}
          message={alertMessage}
        />
      }
      <Component {...pageProps} />
    </>
  )
}

export default App;