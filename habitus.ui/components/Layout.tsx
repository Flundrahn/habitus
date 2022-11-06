import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useAuthContext } from '../components/AuthContext';

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <a className="text-xl">{`${label} `}</a>
    </Link>
  );
}

interface ILink {
  href: string;
  label: string;
}

interface IProps {
  children?: ReactNode;
  title?: string;
}

const links: ILink[] = [
  { href: '/', label: 'Today' },
  { href: '/week', label: 'Week' },
  { href: '/edit', label: 'Edit' },
];

export default function Layout({ children, title = 'Habitus' }: IProps) {
  const { user, loading } = useAuthContext();

  let headerContent: JSX.Element;

  // TODO Cleanup here when finished
  // if (initializing) {
  //   headerContent = <p>Loading...</p>;
  // } else if (!userInfo) {
  if (!user) {
    headerContent = (
      <h1 className="text-cyan-600 text-center text-3xl font-bold [text-shadow:_1px_1px_0_rgb(3_194_252_/_40%),_2px_2px_0_rgb(73_255_17_/_40%),_3px_3px_0_rgb(255_71_163_/_40%)]">
        Habitus
      </h1>
    );
  } else {
    headerContent = (
      <nav className="flex gap-2 font-bold justify-center text-blue-500">
        {links.map(({ href, label }) => (
          <LinkButton href={href} label={label} key={label} />
        ))}
      </nav>
    );
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>{headerContent}</header>
      <main className="p-4 flex flex-col items-center">{children}</main>
      <footer>
        <hr className="m-8" />
        <p className="text-center">Habitus Inc.</p>
      </footer>
    </div>
  );
}
