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
import { SMALL_VIEWPORT_WIDTH } from '../utilities/constants';

function TitleCell({
  title,
  getToggleProps,
}: {
  title: string;
  getToggleProps: (
    config?: GetTogglePropsInput | undefined
  ) => GetTogglePropsOutput;
}) {
  return (
    <div
      {...getToggleProps()}
      className="flex-grow px-2 text-sm md:text-base truncate"
    >
      {title}
    </div>
  );
}

function DataCell({ data }: { data: number }) {
  return (
    <div className="w-8 sm:w-10 md:w-12 md:text-base text-center flex-shrink-0">
      {data}
    </div>
  );
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
      className={`w-8 sm:w-10 md:w-12 flex-shrink-0 h-full text-center text-sm duration-200 hover:scale-[115%] hover:drop-shadow-md ${
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

function LabelRow({ labels }: { labels: string[] }) {
  return (
    <div className="flex justify-center w-full shadow-[0_1px_0_0_#BFDBFE]">
      {React.Children.toArray(
        labels.map(label => (
          <div className="first:flex-grow first:pl-2 first:text-sm md:first:text-base py-1 text-xs sm:text-sm md:text-base text-center first:text-left w-8 sm:w-10 md:w-12 font-bold whitespace-pre-line">
            {label}
          </div>
        ))
      )}
    </div>
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

  return (
    <>
      <div className="flex justify-end items-center w-full h-8 md:h-10 hover:bg-blue-200">
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
          {`${habit.title}: ${habit.description}`}
        </p>
      </div>
    </>
  );
}

export default function HabitsTable({
  user,
  startDate,
  endDate = startDate,
  wrapperClassName,
}: {
  user: IUser;
  startDate: Date;
  endDate?: Date;
  wrapperClassName?: string;
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

  console.log(`This is the wrapper class name${wrapperClassName}`);

  if (error && error.message === 'Request failed with status code 404') {
    mutate([] as IHabit[], {
      revalidate: false,
    });
  } else if (error) return <div>Failed to load</div>;
  if (!habits) return <div>Loading...</div>;

  const addButton = (
    <div className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-500 flex justify-center items-center rounded-full text-white hover:bg-blue-50 hover:text-blue-300">
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
  const dateLabels: string[] = getDateLabels(habits);

  return (
    <>
      <div
        className={`flex flex-col items-center mb-4 bg-white rounded-md overflow-hidden shadow-[0.5px_0_0_0_#BFDBFE,0_1px_0_0_#BFDBFE,1px_1px_0_0_#BFDBFE,1px_0_0_0_#BFDBFE_inset,0_1px_0_0_#BFDBFE_inset] ${wrapperClassName}`}
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

function getDateLabels(habits: IHabit[]): string[] {
  return window.innerWidth > SMALL_VIEWPORT_WIDTH
    ? habits[0].entries.map(e => getDateLabel(new Date(e.date), 'EEE', 'do'))
    : habits[0].entries.map(e => getDateLabel(new Date(e.date), 'EEEEE', 'd'));
}

function getDateLabel(
  date: Date,
  weekdayFormat: string,
  dayOfMonthFormat: string
): string {
  return `${format(date, weekdayFormat)}\n${format(date, dayOfMonthFormat)}`;
}
