import React from 'react';
import HabitsTable from '../components/HabitsTable';
import WeekChart from '../components/WeekChart';

function getStartOfWeek(date = new Date()): Date {
  const dateToReturn = new Date(date);
  const dayOfWeek = date.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  dateToReturn.setDate(date.getDate() - daysToSubtract);

  return dateToReturn;
}

export default function WeekPage() {
  const startDate = getStartOfWeek();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 6);

  return (
    <>
      <HabitsTable startDate={startDate} endDate={endDate} />
      <WeekChart startDate={startDate} endDate={endDate} />
    </>
  );
}
