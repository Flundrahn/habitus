import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../authentication/uiConfig';
import { useAuthContext } from '../components/AuthContext';
import ReactLoading from 'react-loading';

export default function Login() {
  const { auth, user, loading, error } = useAuthContext();
  const router = useRouter();

  if (loading) return <ReactLoading type="spin" />;
  else if (error) return <div>Something went wrong</div>;
  else if (user) router.push('/');

  return (
    <div>
      <h1>Login</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}
