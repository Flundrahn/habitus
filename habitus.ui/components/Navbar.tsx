import { Auth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { ILink, IUser } from '../utilities/interfaces';
import useCollapse from 'react-collapsed';

function Dropdown({ auth, user }: { auth: Auth; user: IUser }) {
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: false,
  });

  const logout = () => {
    signOut(auth).catch(error => console.error(error));
  };

  return (
    <div
      {...getToggleProps()}
      className="absolute right-4 top-2 flex flex-col items-end gap-1 text-sm"
    >
      <div className="flex justify-center items-center text-xl bg-blue-300 w-8 h-8 rounded-full">
        <i className="fa-solid fa-user" />
      </div>
      <div {...getCollapseProps()}>
        <div className="relative flex flex-col gap-1 bg-white items-center mt-1 p-2 shadow-md rounded-sm">
          <p className="text-gray-700">{user.displayName}</p>
          <p className="text-gray-700 overflow-x-scroll">{user.email}</p>
          <button
            onClick={logout}
            className="p-1 bg-gray-400 hover:bg-blue-500 text-white rounded-sm w-4/5"
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

function LinkButton({ href, label }: ILink) {
  return (
    <Link href={href}>
      <a className="text-xl text-blue-500 font-railway">{`${label} `}</a>
    </Link>
  );
}

const links: ILink[] = [
  { href: '/', label: 'Today' },
  { href: '/week', label: 'Week' },
  { href: '/edit', label: 'Edit' },
];

export default function Navbar({ auth, user }: { auth: Auth; user: IUser }) {
  return (
    <nav className="flex justify-center items-center w-full p-2">
      <div className="flex gap-3">
        {links.map(({ href, label }) => (
          <LinkButton href={href} label={label} key={label} />
        ))}
      </div>
      <Dropdown auth={auth} user={user} />
    </nav>
  );
}
