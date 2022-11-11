import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, Auth, getAuth } from 'firebase/auth';
import { firebaseConfig } from '../auth/firebaseConfig';
import { IUser } from '../utilities/interfaces';

interface IAuthContext {
  isInitialized:
    | false
    | {
        auth: Auth;
        user: IUser | null;
      };
}

const AuthContext = createContext<IAuthContext>({
  isInitialized: false,
});

const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const firebaseInstance = initializeApp(firebaseConfig);
    const authInstance = getAuth(firebaseInstance);
    const unsubscribe = onAuthStateChanged(authInstance, async userInfo => {
      // NOTE here in tutorial they set user to null if user is null,
      // but I don't think I need to do that, it would be set null anyway
      // let user: IUser | null;

      if (userInfo !== null) {
        setUser({
          displayName: userInfo.displayName || '',
          email: userInfo.email || '',
          uid: userInfo.uid,
          idToken: await userInfo.getIdToken(),
        });
      } else {
        setUser(null);
      }
    });
    setAuth(authInstance);

    return unsubscribe();
  }, []);

  const value: IAuthContext = useMemo(() => {
    if (auth === undefined) {
      return { isInitialized: false };
    } else {
      return { isInitialized: { auth, user } };
    }
  }, [auth, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuthContext };
