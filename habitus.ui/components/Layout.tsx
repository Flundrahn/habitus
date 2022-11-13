import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useAuthContext } from './AuthContext';
import ReactLoading from 'react-loading';
import { ILink, IUser } from '../utilities/interfaces';
import Quote from './Quote';
import { Auth, signOut } from 'firebase/auth';

function LinkButton({ href, label }: ILink) {
  return (
    <Link href={href}>
      <a className="text-xl text-blue-500">{`${label} `}</a>
    </Link>
  );
}

const links: ILink[] = [
  { href: '/', label: 'Today' },
  { href: '/week', label: 'Week' },
  { href: '/edit', label: 'Edit' },
];

function HeaderContent({ auth, user }: { auth: Auth; user: IUser }) {
  const logout = () => {
    signOut(auth).catch(error => console.error(error));
  };

  return (
    <nav className="flex gap-2 font-bold justify-between items-center w-full p-2">
      <div className="w-52" />
      <div>
        {links.map(({ href, label }) => (
          <LinkButton href={href} label={label} key={label} />
        ))}
      </div>
      <div className="flex gap-1 items-center justify-end w-52 text-sm">
        <span className='text-gray-700'>{user.displayName}</span>
        <button
          onClick={logout}
          className="p-1 bg-gray-400 hover:bg-blue-500 text-white rounded-sm"
        >
          logout
        </button>
      </div>
    </nav>
  );
}

export default function Layout({
  children,
  title = 'Habitus',
}: {
  children?: ReactNode;
  title?: string;
}) {
  const { isInitialized } = useAuthContext();

  let headerContent: JSX.Element;

  if (!isInitialized) {
    // headerContent = <ReactLoading type="spin" />;
    return <div>Loading...</div>;
  } else if (!isInitialized.user) {
    headerContent = (
      <h1 className="text-cyan-600 text-center text-3xl font-bold [text-shadow:_1px_1px_0_rgb(3_194_252_/_40%),_2px_2px_0_rgb(73_255_17_/_40%),_3px_3px_0_rgb(255_71_163_/_40%)]">
        Habitus
      </h1>
    );
  } else {
    headerContent = (
      <HeaderContent auth={isInitialized.auth} user={isInitialized.user} />
    );
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {/* NOTE: Figure out how the content prop here works */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="flex flex-col items-center w-full">
        {headerContent}
        <Quote />
      </header>
      <main className="p-4 flex flex-col items-center">{children}</main>
      <footer>
        <hr className="m-8" />
        <p className="text-center">Habitus Inc.</p>
      </footer>
    </div>
  );
}
