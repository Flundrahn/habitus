import React from 'react';
import { Auth } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebaseui/dist/firebaseui.css';
import ReactLoading from 'react-loading';
import { useAuthContext } from './AuthContext';
import { uiConfig } from '../authentication/uiConfig';

function Login({ auth }: { auth: Auth }) {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized } = useAuthContext();

  if (!isInitialized) {
    return <ReactLoading type="spin" />;
  } else if (!isInitialized.user) {
    return <Login auth={isInitialized.auth} />;
  }
  return <>{children}</>;
};
