import React from 'react';
import { useAuthContext } from '../components/AuthContext';
import HabitsTable from '../components/HabitsTable';
import Login from '../components/Login';
import WeekChart from '../components/WeekChart';

function getCurrentWeekBounds(): { startOfWeek: Date; endOfWeek: Date } {
  const today: Date = new Date();
  const currentDayOfWeek: number = today.getDay();
  const startOfWeek: Date = new Date(today);
  const endOfWeek: Date = new Date(today);

  startOfWeek.setDate(today.getDate() - currentDayOfWeek + 1);
  endOfWeek.setDate(today.getDate() + (7 - currentDayOfWeek));

  return {
    startOfWeek,
    endOfWeek,
  };
}

export default function WeekPage() {
  const { isInitialized } = useAuthContext();
  const { startOfWeek, endOfWeek } = getCurrentWeekBounds();

  if (!isInitialized) {
    return <div>Loading...</div>;
    // return <ReactLoading type="spin" />;
  } else if (!isInitialized.user) {
    return <Login auth={isInitialized.auth} />;
  }

  return (
    <>
      <HabitsTable
        user={isInitialized.user}
        startDate={startOfWeek}
        endDate={endOfWeek}
        wrapperClassName="w-[96%] md:w-[700px] text-sm md:text-base"
      />
      <WeekChart
        user={isInitialized.user}
        startDate={startOfWeek}
        endDate={endOfWeek}
      />
    </>
  );
}
