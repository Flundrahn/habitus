// Import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { format } from 'date-fns';
import { IHabit, IEntry } from '../utilities/interfaces';
import { habitsToday } from '../utilities/sample-data'    ;
import { useState } from 'react';

function addHabitEntry (
  habitId: number,
  date: Date,
  setHabits: React.Dispatch<React.SetStateAction<IHabit[]>>
) {
  const newEntry: IEntry = {
    // TODO Make sure the id works when calling api, should set in db not here.
    // probably will make temporary object to send to api and then get back with id
    id: 0,
    habitId,
    date: date,
  };

  setHabits(currentHabits => currentHabits.map(habit => {
    // NOTE This is a collection of todays habits, each has a collection of entries or null, since it is only for today there should only be one entry, but can make method generalizable to handle existing collection of entries 

    let newEntries: IEntry[];

    if (habit.id === habitId) {
      if (habit.entries === undefined) {
        newEntries = [newEntry];
      } else {
        newEntries = [...habit.entries, newEntry];
      }
      return {
        ...habit,
        entries: newEntries,
      };
    } else {
      return habit;
    }
  }
  ));
}

function removeHabitEntry(
  habitId: number,
  entryId: number,
  setHabits: React.Dispatch<React.SetStateAction<IHabit[]>>
) {
  setHabits(currentHabits => currentHabits.map(habit => {
    if (habit.id === habitId) {
      habit.entries = habit.entries?.filter(entry => entry.id !== entryId);
    }
    return habit;
  }));
}

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
              {/* {habit.entries ? "x" : "."} */}
            </td>
            <td className="pl-2 pr-2 text-center">{habit.goal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const IndexPage = () => {
  const [todaysHabits, setTodaysHabits] = useState(habitsToday);
  
  const date = new Date();

  return (
    <Layout title="Today | Habitus">
      <HabitsTable habits={todaysHabits} setHabits={setTodaysHabits} date={date} />
    </Layout>
  );
};

export default IndexPage;
