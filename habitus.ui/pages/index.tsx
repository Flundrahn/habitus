import Today from '../components/Today';
// import Login from '../components/Login';
import ReactLoading from 'react-loading';
import { useAuthContext } from '../components/AuthContext';
import { useRouter } from 'next/router';

export default function IndexPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (!user) router.push('/');

  if (loading) {
    return <ReactLoading type="spin" />;
    // return <div>Loading...</div>;
  }

  return (
    // <RequireLogin>
    <Today />
    // </RequireLogin>
  );
}
