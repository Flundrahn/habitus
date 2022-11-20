import { useMemo } from 'react';
import Login from '../components/Login';
import { useAuthContext } from '../components/AuthContext';
import HabitsTable from '../components/HabitsTable';

export default function IndexPage() {
  const { isInitialized } = useAuthContext();
  const todaysDate = useMemo(() => new Date(), []);

  if (!isInitialized) {
    return <div>Loading...</div>;
    // return <ReactLoading type="spin" />;
  } else if (!isInitialized.user) {
    return <Login auth={isInitialized.auth} />;
  }

  return (
    <div className="flex flex-col items-center w-3/6">
      <HabitsTable user={isInitialized.user} startDate={todaysDate} />
    </div>
  );
}
