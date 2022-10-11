import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

function LinkButton({ href, label }: {href: string, label: string}) {
  return (
    <Link href={href} >
      <a className="text-xl">{`${label} `}</a>
    </Link>
  );
}

interface ILink {
  href: string,
  label: string
}

interface IProps {
  children?: ReactNode;
  title?: string;
}

const links: ILink[] = [
  { href: '/', label: 'Today' },
  { href: '/weeks/1', label: 'Week' },
  { href: '/edit', label: 'Edit' },
];

const Layout = ({ children, title = 'Habitus' }: IProps) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="flex gap-2 font-bold justify-center text-blue-500">
        {links.map(({ href, label }) => (<LinkButton href={href} label={label} key={label} />))}
      </nav>
    </header>
    <main className="p-4">
      {children}
    </main>
    <footer>
      <hr />
      <p className="text-center">Habitus Inc.</p>
    </footer>
  </div>
);

export default Layout;
