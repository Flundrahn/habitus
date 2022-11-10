import React from 'react';
import { ToastContainer } from 'react-toastify';
import HabitForm from '../components/HabitForm';
import useHabitusApi from '../utilities/useHabitusApi';
import 'react-toastify/dist/ReactToastify.css';

function Labels({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-wrap w-full justify-center">
      {React.Children.toArray(
        labels.map(l => (
          <span className="text-xs bg-gray-200 rounded-full px-2 py-1 m-1">
            {l}
          </span>
        ))
      )}
    </div>
  );
}

export default function EditPage() {
  const { data, putHabit, deleteHabit, error } = useHabitusApi();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const addButton = (
    <div className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full">
      <i className="fa-solid fa-floppy-disk" />
    </div>
  );

  const labels = ['Title', 'Weekly goal', 'Color', 'Description'];

  return (
    <>
      <p>Here you can edit your habits</p>
      <div>
        <Labels labels={labels} />
        {data.map(habit => (
          <div key={habit.id} className="flex items-center">
            <HabitForm
              habit={habit}
              key={habit.id}
              apiAction={putHabit}
              button={addButton}
            />
            <button
              onClick={() => deleteHabit(habit)}
              className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full"
            >
              <i className="fa-solid fa-trash" />
            </button>
          </div>
        ))}
      </div>
      <ToastContainer
        autoClose={3000}
        position="bottom-center"
        hideProgressBar
        draggable
        pauseOnHover
        className="text-center"
      />
    </>
  );
}
