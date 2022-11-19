import React from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Script from 'next/script';
import '../styles/globals.css';
import { AuthProvider } from '../components/AuthContext';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/e279515a73.js"
        strategy="lazyOnload"
      />
      <Head>
        <meta charSet="utf-8" />
        {/* NOTE: Figure out how the content prop here works */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
