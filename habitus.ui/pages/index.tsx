/* eslint-disable react-hooks/exhaustive-deps */
import HabitsTable from '../components/HabitsTable';

export default function IndexPage () {
  const todaysDate = new Date();

  return (
    <HabitsTable startDate={todaysDate} />
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
