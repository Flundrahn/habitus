import { Auth } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../auth/uiConfig';

export default function Login({ auth }: { auth: Auth }) {
  return (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={auth}
      uiCallback={ui => ui.disableAutoSignIn()}
    />
  );
}
