import React, { useState } from 'react';
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
    <td className={`pl-2 pr-2 text-center ${entry.isCompleted ? "bg-green-400" : "bg-red-300 text-transparent"} `}>
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
    <tr className="table-row ">
      <DataCell data={habit.title} />
      {React.Children.toArray(habit.entries.map(entry => (
        <EntryCell entry={entry} postEntry={postEntry} deleteEntry={deleteEntry} />
      )))}
      <DataCell data={habit.goal} />
      <DataCell data={habit.description || ''} />
    </tr>
  );
}

function CreateButton() {
  const [showButton, setShowButton] = useState(true);
  
  const handleClick = () => {
    console.log("hello from create button");
  };

  return ( 
    <button className="h-8 w-full bg-gray-400 border-solid border-2 border-gray-600" onClick={handleClick}>
      <i className="fa-solid fa-plus"></i>    
    </button>
  );
}

export default function HabitsTable ( { startDate, endDate = startDate }: { startDate: Date, endDate?: Date } ) {
  const { data, error, postEntry, deleteEntry } = useHabitusApi(startDate, endDate);

  // console.log("HabitsTable re-rendered");
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  
  const dateLabels: string[] = data[0].entries.map(e => (format(new Date(e.date), 'EEE do')));

  return (
    <table className="table-auto ">
      <Header labels={["Habit", ...dateLabels , "Goal", "Description"]} />
      <tbody>
        {data.map((habit: IHabit) => (
          <Row habit={habit} key={habit.id} postEntry={postEntry} deleteEntry={deleteEntry} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="" colSpan={100}>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
