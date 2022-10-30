import React from 'react';
import { lazy } from 'react';
import { Suspense } from 'react';
import ReactLoading from 'react-loading';
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

  // const weekChartPromise = import(
  //   /* webpackChunkName: 'week-chart' */ '../components/WeekChart'
  // );
  // const LazyWeekChart = lazy(() => weekChartPromise);

  return (
    <>
      <HabitsTable startDate={startDate} endDate={endDate} />
      {/* <Suspense fallback={<ReactLoading type="spin" />}> */}
      <WeekChart startDate={startDate} endDate={endDate} />
      {/* </Suspense> */}
    </>
  );
}
