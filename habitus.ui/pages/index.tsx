import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';
import HabitsTable from '../components/HabitsTable';
import { IQuote } from '../utilities/interfaces';
import API__BASE_URL from '../utilities/constants';

export default function IndexPage() {
  const todaysDate = useMemo(() => new Date(), []);

  const fetcher = (url: string) =>
    axios.get(url).then(response => response.data);
  const { data, error } = useSWR<IQuote>(`${API__BASE_URL}/quotes`, fetcher);

  let quoteDiv: JSX.Element;
  if (error) {
    quoteDiv = <div>Failed to load</div>;
  } else if (!data) {
    quoteDiv = <div>Loading...</div>;
  } else {
    quoteDiv = (
      <>
        <div className="text-sm max-w-md">&ldquo;{data.quoteText}&#8221;</div>
        <div className="text-sm">{` - ${data.philosopher}`}</div>
      </>
    );
  }

  // console.log("IndexPage re-rendered");
  return (
    <>
      {quoteDiv}
      <HabitsTable startDate={todaysDate} />
    </>
  );
}

// NOTE Leave this part if want to use to store state later
// useLayoutEffect(() => {
//   const storedItems = localStorage.getItem('todaysHabits');
//   if (storedItems) {
//     setTodaysHabits(JSON.parse(storedItems));
//   } else {
//     sessionStorage.setItem('todaysHabits', todaysHabits.toString());
//   }
// }, []);

// useEffect(() => {
//   sessionStorage.setItem('todaysHabits', todaysHabits.toString());
// }, [todaysHabits]);
