import React from 'react';
import { useAuthContext } from '../components/AuthContext';
import HabitsTable from '../components/HabitsTable';
import Login from '../components/Login';
import WeekChart from '../components/WeekChart';

function getStartOfWeek(date = new Date()): Date {
  const dateToReturn = new Date(date);
  const dayOfWeek = date.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  dateToReturn.setDate(date.getDate() - daysToSubtract);

  return dateToReturn;
}

export default function WeekPage() {
  const { isInitialized } = useAuthContext();
  const startDate = getStartOfWeek();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 6);

  if (!isInitialized) {
    return <div>Loading...</div>;
    // return <ReactLoading type="spin" />;
  } else if (!isInitialized.user) {
    return <Login auth={isInitialized.auth} />;
  }

  return (
    <div className="flex flex-col items-center w-[96%] h-full md:w-[600px] text-sm md:text-base">
      <HabitsTable
        user={isInitialized.user}
        startDate={startDate}
        endDate={endDate}
      />
      <WeekChart
        user={isInitialized.user}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
