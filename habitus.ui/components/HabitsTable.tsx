import React, { useState } from 'react';
import { format } from 'date-fns';
import { IEntry, IHabit, IUser } from '../utilities/interfaces';
import useHabitusApi from '../utilities/useHabitusApi';
import HabitForm from './HabitForm';
import { useAuthContext } from './AuthContext';
import useCollapse from 'react-collapsed';
import {
  GetTogglePropsInput,
  GetTogglePropsOutput,
} from 'react-collapsed/dist/types';

function LabelRow({ labels }: { labels: string[] }) {
  return (
    <div className="flex justify-center w-full shadow-[0_1px_0_0_#BFDBFE]">
      {React.Children.toArray(
        labels.map(label => (
          <div className="first:flex-grow first:pl-2 py-1 text-xs first:text-sm text-center first:text-left w-8 font-bold">
            {label}
          </div>
        ))
      )}
    </div>
  );
}

function TitleCell({
  title,
  getToggleProps,
}: {
  title: string;
  getToggleProps: (
    config?: GetTogglePropsInput | undefined
  ) => GetTogglePropsOutput;
}) {
  // console.log("Rendering titleCell");
  return (
    <div {...getToggleProps()} className="flex-grow px-2 py-1 text-sm truncate">
      {title}
    </div>
  );
}

function DataCell({ data }: { data: number }) {
  // console.log("Rendering DataCell");
  return <div className="w-8 text-center px-2 py-1">{data}</div>;
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

  const { isInitialized } = useAuthContext();
  function handleClick() {
    if (entry.isCompleted) {
      deleteEntry(entry);
    } else {
      const newEntry: IEntry = {
        ...entry,
        isCompleted: true,
        userId:
          isInitialized && isInitialized.user ? isInitialized.user.id : '',
      };
      postEntry(newEntry);
    }
  }

  return (
    <button
      className={`w-8 px-2 py-1 text-center text-sm duration-300 hover:scale-110 hover:drop-shadow-md ${
        entry.isCompleted
          ? 'bg-green-300 text-gray-600'
          : 'bg-red-300 text-transparent'
      } `}
      onClick={handleClick}
    >
      <i className="fa-solid fa-xmark" />
    </button>
  );
}

function DataRow({
  habit,
  postEntry,
  deleteEntry,
}: {
  habit: IHabit;
  postEntry: (entry: IEntry) => Promise<void>;
  deleteEntry: (entry: IEntry) => Promise<void>;
}) {
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: false,
  });

  // console.log("Rendering Row");

  return (
    <>
      <div className="flex w-full hover:bg-blue-200">
        <TitleCell title={habit.title} getToggleProps={getToggleProps} />
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
      </div>
      <div {...getCollapseProps()}>
        <p className="w-full text-gray-600 p-2 text-sm">
          {habit.description || ''}
        </p>
      </div>
    </>
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
  const {
    data: habits,
    mutate,
    error,
    postEntry,
    deleteEntry,
    postHabit,
  } = useHabitusApi(user.idToken, startDate, endDate);
  const [showForm, setShowForm] = useState(false);

  // console.log("HabitsTable re-rendered");

  if (error && error.message === 'Request failed with status code 404') {
    mutate([] as IHabit[], {
      revalidate: false,
    });
  } else if (error) return <div>Failed to load</div>;
  if (!habits) return <div>Loading...</div>;

  const addButton = (
    <div className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full">
      <i className="fa-solid fa-plus" />
    </div>
  );

  if (habits.length == 0) {
    return (
      <>
        <p className="m-2">Looks empty here, try creating a new habit</p>
        {showForm ? (
          <HabitForm
            user={user}
            title="Add a new habit"
            apiAction={postHabit}
            button={addButton}
            setShowForm={setShowForm}
            entriesLength={0}
          />
        ) : (
          <button onClick={() => setShowForm(true)}>{addButton}</button>
        )}
      </>
    );
  }
  const dateLabels: string[] = habits[0].entries.map(e =>
    format(new Date(e.date), 'EEE d')
  );

  return (
    <>
      <div
        className={
          'flex flex-col w-full mb-4 bg-white rounded-md overflow-hidden shadow-[0.5px_0_0_0_#BFDBFE,0_1px_0_0_#BFDBFE,1px_1px_0_0_#BFDBFE,1px_0_0_0_#BFDBFE_inset,0_1px_0_0_#BFDBFE_inset]'
          // 'flex flex-col w-full mb-4 bg-white rounded-md overflow-hidden border border-[#BFDBFE] shadow-sm'
        }
      >
        <LabelRow labels={['Habit', ...dateLabels, 'Score', 'Goal']} />
        {habits.map((habit: IHabit) => (
          <DataRow
            habit={habit}
            key={habit.id}
            postEntry={postEntry}
            deleteEntry={deleteEntry}
          />
        ))}
      </div>
      {showForm ? (
        <HabitForm
          user={user}
          title="Add new habit"
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
