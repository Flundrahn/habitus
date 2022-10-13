import { format } from 'date-fns';
import { IHabit, IEntry } from '../utilities/interfaces';
// import { habitsToday } from '../utilities/sample-data';
import { useState } from 'react';
import removeHabitEntry from '../utilities/removeHabitEntry';
import addHabitEntry from '../utilities/addHabitEntry';
import getHabits from '../utilities/getHabits';

const HabitsTable = ( {
  habits, 
  setHabits, 
  date 
}: {
  habits: IHabit[], 
  setHabits: React.Dispatch<React.SetStateAction<IHabit[]>>, 
  date: Date
} ) => {
  const handleClick = (habit: IHabit) => {
    if (habit.entries && habit.entries.length > 0) {
      removeHabitEntry(habit.id, habit.entries[0].id, setHabits);
    }
    else {
      addHabitEntry(habit.id, date, setHabits);
    }
  };

  return (
    <table className="table-auto">
      <thead>
        <tr className="table-row">
          <th className="pl-2 pr-2 text-left">Habit</th>
          <th className="pl-2 pr-2 text-left">
            <time dateTime={date.toDateString()}>
              {format(date, 'LLLL d')}
            </time>
          </th>
          <th className="pl-2 pr-2 text-left">Weekly Goal</th>
          <th className="pl-2 pr-2 text-left">Note</th>
        </tr>
      </thead>
      <tbody>
        {habits.map(habit => (
          <tr key={habit.id}>
            <td className="pl-2 pr-2">
              {habit.title}
            </td>
            <td className={`pl-2 pr-2 text-center ${(habit.entries && habit.entries.length > 0) ? "bg-green-400" : "bg-red-300 text-transparent"}`}>
              <button className="h-full w-full" onClick={() => handleClick(habit)}>x</button>
            </td>
            <td className="pl-2 pr-2 text-center">{habit.goal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// TODO Evaluate if getStaticProps is appropriate, api call with initial data
// NOTE If there were multiple users it would not be possible to do serverside, might want
// to build app to work with auth and multiple users later
export async function getStaticProps() {
  const todaysHabitsData = await getHabits(new Date());

  return {
    props: {
      todaysHabitsData
    }
  };
}

const IndexPage = () => {
  const [todaysHabits, setTodaysHabits] = useState<IHabit[]>([]);

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

  const date = new Date();

  return (
    <HabitsTable habits={todaysHabits} setHabits={setTodaysHabits} date={date} />
  );
};

export default IndexPage;
