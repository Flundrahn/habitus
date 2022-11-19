import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useAuthContext } from './AuthContext';
import Quote from './Quote';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';


export default function Layout({ children }: { children?: ReactNode }) {
  const { isInitialized } = useAuthContext();

  if (!isInitialized) {
    // return <ReactLoading type="spin" />;
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Habitus</title>
      </Head>
      <header className="fixed top-0 flex flex-col items-center w-full z-10 bg-white shadow-sm">
        {isInitialized.user ? (
          <Navbar auth={isInitialized.auth} user={isInitialized.user} />
        ) : (
          <h1 className="text-cyan-600 text-center text-3xl font-bold [text-shadow:_1px_1px_0_rgb(3_194_252_/_40%),_2px_2px_0_rgb(73_255_17_/_40%),_3px_3px_0_rgb(255_71_163_/_40%)]">
            Habitus
          </h1>
        )}
      </header>
      <main className="p-4 flex flex-col items-center bg-zinc-100">
        <div className="h-12" />
        <Quote />
        {children}
      </main>
      <footer className="bg-zinc-100">
        <hr className="m-8" />
        <p className="text-center">Habitus Inc.</p>
        <ToastContainer
          autoClose={3000}
          position="bottom-center"
          hideProgressBar
          draggable
          pauseOnHover
          className="text-center"
        />
      </footer>
    </div>
  );
}
