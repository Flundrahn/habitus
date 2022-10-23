import React from 'react';
import useHabitusApi from '../utilities/useHabitusApi';
import HabitForm from '../components/HabitForm';
// NOTE Get idea to make createHabit general enough to be used for both create and edit
// difference is either populate inputs with currentHabit or not, and pass different action
// post and puthabit
// Problem that button is in? No just move it to right and fix visuals
// difference also don't want to show title

function Labels({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-wrap w-full justify-center">
      {React.Children.toArray(labels.map(l => (
        <span className="text-xs bg-gray-200 rounded-full px-2 py-1 m-1">{l}</span>
      )))}
    </div>
  );
}

export default function EditPage() {
  const { data, putHabit, deleteHabit, error } = useHabitusApi();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const addButton = <div className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full">
    <i className="fa-solid fa-floppy-disk" />
  </div>;

  // what I want to do here
  // get all habits, show in list,
  // allow to click each and change and submit, map over habit create forms for eeach, have global submit button looks best
  const labels = ["Title", "Weekly goal", "Color", "Description"];

  return (
    <>
      <p>Here you can edit your habits</p>
      <div>
        <Labels labels={labels} />
        {data.map(habit => (
          <div key={habit.id} className="flex items-center">
            <HabitForm habit={habit} key={habit.id} apiAction={putHabit} button={addButton}/>
            <button onClick={() => deleteHabit(habit)}className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full"><i className="fa-solid fa-trash" /></button>
          </div>
        ))}
      </div>
    </>
  );
}

