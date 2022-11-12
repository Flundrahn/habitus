import React from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Script from 'next/script';
import '../styles/globals.css';
// import { AuthProvider } from '../components/AuthContext';
import initAuth from '../authentication/initAuth';

initAuth();

function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Script
        src="https://kit.fontawesome.com/e279515a73.js"
        strategy="lazyOnload"
      />
      {/* <AuthProvider> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
