import React, { useState } from 'react';
import { format } from 'date-fns';
import { IEntry, IHabit, IUser } from '../utilities/interfaces';
import useHabitusApi from '../utilities/useHabitusApi';
import HabitForm from './HabitForm';

function Header({ labels }: { labels: string[] }) {
  return (
    <thead>
      <tr>
        {React.Children.toArray(
          labels.map(label => (
            <th className="table-cell pl-2 pr-2 text-left font-bold">
              {label}
            </th>
          ))
        )}
      </tr>
    </thead>
  );
}

function DataCell({ data }: { data: string | number }) {
  // console.log("Rendering DataCell");
  return <td className="table-cell pl-2 pr-2">{data}</td>;
}

function EntryCell({
  entry,
  postEntry,
  deleteEntry,
}: {
  entry: IEntry;
  postEntry: (entry: IEntry) => Promise<void>;
  deleteEntry: (entry: IEntry) => Promise<void>;
}) {
  // console.log("Rendering EntryCell");

  function handleClick() {
    if (entry.isCompleted) {
      deleteEntry(entry);
    } else {
      const updatedEntry = { ...entry, isCompleted: true };
      postEntry(updatedEntry);
    }
  }

  return (
    <td
      className={`pl-2 pr-2 text-center ${
        entry.isCompleted ? 'bg-green-300' : 'bg-red-300 text-transparent'
      } `}
    >
      <button className="h-full w-full" onClick={handleClick}>
        x
      </button>
    </td>
  );
}

function Row({
  habit,
  postEntry,
  deleteEntry,
}: {
  habit: IHabit;
  postEntry: (entry: IEntry) => Promise<void>;
  deleteEntry: (entry: IEntry) => Promise<void>;
}) {
  // console.log("Rendering Row");

  return (
    <tr className="table-row hover:bg-blue-200">
      <DataCell data={habit.title} />
      {React.Children.toArray(
        habit.entries.map(entry => (
          <EntryCell
            entry={entry}
            postEntry={postEntry}
            deleteEntry={deleteEntry}
          />
        ))
      )}
      <DataCell data={habit.score || 0} />
      <DataCell data={habit.goal} />
      <DataCell data={habit.description || ''} />
    </tr>
  );
}

export default function HabitsTable({
  user,
  startDate,
  endDate = startDate,
}: {
  user: IUser;
  startDate: Date;
  endDate?: Date;
}) {
  const { data, error, postEntry, deleteEntry, postHabit } = useHabitusApi(
    user.idToken,
    startDate,
    endDate
  );
  const [showForm, setShowForm] = useState(false);

  // console.log("HabitsTable re-rendered");

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const addButton = (
    <div className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full">
      <i className="fa-solid fa-plus" />
    </div>
  );

  if (data.length == 0) {
    return (
      <>
        <p className="m-2">Looks empty here, try creating a new habit!</p>
        {showForm ? (
          <HabitForm
            title="Add a new habit"
            apiAction={postHabit}
            button={addButton}
            setShowForm={setShowForm}
          />
        ) : (
          <button onClick={() => setShowForm(true)}>{addButton}</button>
        )}
      </>
    );
  }
  const dateLabels: string[] = data[0].entries.map(e =>
    format(new Date(e.date), 'EEE do')
  );

  return (
    <>
      <table className="table-auto m-4">
        <Header
          labels={['Habit', ...dateLabels, 'Score', 'Goal', 'Description']}
        />
        <tbody>
          {data.map((habit: IHabit) => (
            <Row
              habit={habit}
              key={habit.id}
              postEntry={postEntry}
              deleteEntry={deleteEntry}
            />
          ))}
        </tbody>
      </table>
      {showForm ? (
        <HabitForm
          title="Add a new habit"
          apiAction={postHabit}
          button={addButton}
          setShowForm={setShowForm}
        />
      ) : (
        <button onClick={() => setShowForm(true)}>{addButton}</button>
      )}
    </>
  );
}