import React from 'react';
import { format } from 'date-fns';
import { IEntry, IHabit } from '../utilities/interfaces';
import useHabitusApi from '../utilities/useHabitusApi';

function Header({ labels } : {labels: string[]}) {
  return ( 
    <thead>
      <tr>
        {React.Children.toArray(labels.map(label => (
          <th className="table-cell pl-2 pr-2 text-left font-bold">{label}</th>
        )))}
      </tr>
    </thead>
  );
}

function DataCell ({ data }: {data: string | number}) {
  return (
    <td className="table-cell pl-2 pr-2">{data}</td>
  );
}

function EntryCell ({ 
  entry,
  postEntry,
  deleteEntry 
}: { 
  entry: IEntry,
  postEntry: (entry: IEntry) => Promise<void>, 
  deleteEntry: (entry: IEntry) => Promise<void>
}) {
  // const [entryState, setEntryState] = useState(entry);
  
  // console.log("Rendering EntryCell");

  function handleClick() {
    if (entry.isCompleted) {
      deleteEntry(entry);
    }
    else {
      const updatedEntry = { ...entry, isCompleted: true };
      postEntry(updatedEntry);
    }
  }
  
  return (
    <td className={`pl-2 pr-2 text-center ${entry.isCompleted ? "bg-green-400" : "bg-red-300 text-transparent"}`}>
      <button className="h-full w-full" onClick={handleClick}>x</button>
    </td>
  );
}

function Row({
  habit,
  postEntry,
  deleteEntry
} : {
  habit: IHabit, 
  postEntry: (entry: IEntry) => Promise<void>
  deleteEntry: (entry: IEntry) => Promise<void>
}) {
  // console.log("Rendering Row");
  
  return ( 
    <tr className="table-row">
      <DataCell data={habit.title} />
      {React.Children.toArray(habit.entries.map(entry => (
        <EntryCell entry={entry} postEntry={postEntry} deleteEntry={deleteEntry} />
      )))}
      <DataCell data={habit.goal} />
      <DataCell data={habit.description || ''} />
    </tr>
  );
}

export default function HabitsTable ( { startDate, endDate = startDate }: { startDate: Date, endDate?: Date } ) {
  // console.log("HabitsTable re-rendered");

  const { data, error, postEntry, deleteEntry } = useHabitusApi(startDate, endDate);
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <table className="table-auto">
      <Header labels={["Habit", format(startDate, 'EEE do'), "Goal", "Description"]} />
      <tbody>
        {data.map((habit: IHabit) => (
          <Row habit={habit} key={habit.id} postEntry={postEntry} deleteEntry={deleteEntry} />
        ))}
      </tbody>
    </table>
  );
}

{/* <thead>
        <tr className="table-row">
          <th className="pl-2 pr-2 text-left">Habit</th>
          <th className="pl-2 pr-2 text-left">
            <time dateTime={date}>
              {format(new Date(date), 'LLLL d')}
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
      </tbody> */
}
