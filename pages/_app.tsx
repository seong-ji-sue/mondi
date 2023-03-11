import { AlertModal } from '@components/Modal';
import useAppStore from '@stores/app';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from "styled-components";
import "../styles/globals.css";

const Container = styled.div``;

const App = ({ Component, pageProps }: AppProps) => {
  const alertMessage = useAppStore(state => state.alertMessage);
  const router = useRouter();

  useEffect(() => {
    useAppStore.setState({ alertMessage: "" });
  }, [router.pathname])

  return (
    <Container style={router.pathname === "/" ? {} : { maxWidth: 640, margin: "0 auto" }}>
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
    </Container>
  )
}

export default App;