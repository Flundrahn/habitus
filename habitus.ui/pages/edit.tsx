import React from 'react';
import HabitForm from '../components/HabitForm';
import useHabitusApi from '../utilities/useHabitusApi';
import { useAuthContext } from '../components/AuthContext';
import { useRouter } from 'next/router';
import { IUser } from '../utilities/interfaces';

function Labels({ labels }: { labels: string[] }) {
  return (
    <div className="flex w-full justify-center">
      {React.Children.toArray(
        labels.map(l => (
          <span className="text-xs bg-blue-100 rounded-full px-2 py-1 m-1">
            {l}
          </span>
        ))
      )}
    </div>
  );
}

export default function EditPage() {
  const { isInitialized } = useAuthContext();
  const router = useRouter();

  if (!isInitialized || !isInitialized.user) {
    router.push('/');
  }

  const idToken =
    isInitialized && isInitialized.user ? isInitialized.user.idToken : '';
  const { data, putHabit, deleteHabit, error } = useHabitusApi(idToken);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const saveButton = (
    <div className="h-6 w-6 ml-2 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full">
      <i className="fa-solid fa-floppy-disk" />
    </div>
  );

  const labels = ['Title', 'Weekly goal', 'Color', 'Description'];

  return (
    <div className="w-11/12">
      <Labels labels={labels} />
      {data.map(habit => (
        <div key={habit.id} className="flex items-center justify-center">
          <HabitForm
            habit={habit}
            key={habit.id}
            apiAction={putHabit}
            button={saveButton}
            user={
              isInitialized && isInitialized.user
                ? isInitialized.user
                : ({} as IUser)
            }
          />
          <button
            onClick={() => deleteHabit(habit)}
            className="h-6 w-6 ml-8 bg-blue-300 shadow-sm shadow-gray-800 text-gray-800 flex justify-center items-center rounded-full"
          >
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      ))}
    </div>
  );
}
