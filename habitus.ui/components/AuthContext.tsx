import { User, getAuth, Auth } from 'firebase/auth';
// import firebaseui from 'firebaseui';
import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import initFirebase from '../authentication/initFirebase';
import { FirebaseApp } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

// TODO Cleanup here
interface IAuthContext {
  loading: boolean;
  user?: User | null;
  auth?: Auth;
  // signOut?: () => Promise<void>;
  firebase?: FirebaseApp;
  error?: Error;
  // authUi: firebaseui.auth.AuthUI | null;
}

const AuthContext = createContext<IAuthContext>({
  loading: true,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [firebase, setFirebase] = useState<FirebaseApp>();
  // const [auth, setAuth] = useState<Auth>();

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUserInfo] = useState<User | null>(null);
  // const [signOut, setSignOut] = useState<() => Promise<void>>();

  // const [authUi, setAuthUi] = useState<firebaseui.auth.AuthUI | null>(null);

  // NOTE Might be that initializing firebase takes a long time, in which case could try to put it in
  // useEffect, and partially render the app
  const { firebase, auth } = useMemo(() => initFirebase(), []);
  const [user, loading, error] = useAuthState(auth);

  // NOTE Can't init in useEffect because auth might be undefined and then I can't call the useAuthState hook
  // useEffect(() => {
  //   const firebaseInstance = initFirebase();
  //   const authInstance = getAuth(firebaseInstance);
  //   // setFirebase(firebaseInstance);
  //   // setAuth(authInstance);
  // }, []);

  // const firebase = useMemo(() => initFirebase(), []);
  // const auth = useMemo(() => getAuth(firebase), [firebase]);

  useEffect(() => {
    // const unsubscribe = authInstance.onAuthStateChanged(newUser => {
    //   // TODO Unsure how this getInstance works, test if side effect log in and out as different user.
    //   // setAuthUi(
    //   //   firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    //   // );
    //   // NOTE here in tutorial they set user to null if user is null,
    //   // but I don't think I need to do that, it would be set null anyway
    //   setUserInfo(newUser);
    // });
    // setSignOut(() => authInstance.signOut());
    // setAuth(authInstance);
    // setInitializing(false);
    // return unsubscribe();
  }, [firebase]);

  // TODO Solve how use useMemo with context
  const value = useMemo(
    () => ({
      user,
      loading,
      auth,
      // signOut,
      firebase,
      error,
      // authUi,
    }),
    [user, loading, auth, firebase, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
