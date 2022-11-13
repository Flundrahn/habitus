import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios';
import { IEntry, IHabit, IPostResponse } from './interfaces';
import API_BASE_URL from './constants';
import produce from 'immer';
import { toast } from 'react-toastify';

const fetcher = (url: string, idToken: string) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
    .then(response => response.data);

const poster = async (
  uri: string,
  entity: IEntry | IHabit,
  idToken: string
) => {
  const response = await axios.post<IPostResponse>(
    `${API_BASE_URL}/${uri}`,
    entity,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );

  checkResponse(response);
};

const putter = async (
  uri: string,
  entity: IEntry | IHabit,
  idToken: string
) => {
  const response = await axios.put<IPostResponse>(
    `${API_BASE_URL}/${uri}/${entity.id}`,
    entity,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );

  checkResponse(response);
};

const deleter = async (uri: string, id: number, idToken: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${uri}/${id}`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });

  checkResponse(response);
};

function checkResponse(response: AxiosResponse) {
  if (response.status > 299) {
    throw new Error('Something went wrong while making request to API');
  }
}

export default function useHabitusApi(
  idToken: string,
  startDate?: Date,
  endDate?: Date
) {
  let fetchUri: string;

  if (endDate && !startDate) {
    throw new Error('You must provide a start date if you provide an end date');
  } else if (startDate && endDate) {
    fetchUri = `habits/filter?startDate=${startDate.toDateString()}&endDate=${endDate.toDateString()}`;
  } else if (startDate) {
    fetchUri = `habits/filter?startDate=${startDate.toDateString()}`;
  } else {
    fetchUri = 'habits';
  }

  const { data, mutate, error } = useSWR<IHabit[]>(
    [`${API_BASE_URL}/${fetchUri}`, idToken],
    fetcher
  );

  function createApiCaller<T extends IEntry | IHabit>(
    apiAction: (entity: T) => Promise<void>,
    optimisticDataProducer: (entity: T) => IHabit[] | undefined,
    successmessage?: string
  ) {
    return async (entity: T) => {
      const optimisticData = optimisticDataProducer(entity);

      try {
        mutate(
          async () => {
            await apiAction(entity);
            return optimisticData;
          },
          {
            optimisticData: optimisticData,
            rollbackOnError: true,
            populateCache: true,
            revalidate: true,
          }
        );
        if (successmessage) {
          toast.success(successmessage);
        }
      } catch (error) {
        toast.error('Something went wrong');
        console.error(error);
      }
    };
  }

  const postEntry = createApiCaller<IEntry>(
    (entry: IEntry) => poster('entries', entry, idToken),
    (entry: IEntry) =>
      produce(data, (draft: IHabit[]) => {
        const habitIndex = draft.findIndex(h => h.id === entry.habitId);
        const entryIndex = draft[habitIndex].entries.findIndex(
          e => e.id === entry.id
        );

        if (entryIndex !== -1 && habitIndex !== -1) {
          draft[habitIndex].entries[entryIndex] = entry;
        } else {
          console.error('Entry not found among local habits');
        }
      })
  );

  const deleteEntry = createApiCaller<IEntry>(
    (entry: IEntry) => deleter('entries', entry.id, idToken),
    (entry: IEntry) =>
      produce(data, (draft: IHabit[]) => {
        const habitIndex = draft.findIndex(h => h.id === entry.habitId);
        const entryIndex = draft[habitIndex].entries.findIndex(
          e => e.id === entry.id
        );

        if (entryIndex !== -1 && habitIndex !== -1) {
          draft[habitIndex].entries[entryIndex].id = 0;
          draft[habitIndex].entries[entryIndex].isCompleted = false;
        } else {
          console.error('Entry not found among local habits');
        }
      })
  );

  const postHabit = createApiCaller<IHabit>(
    (habit: IHabit) => poster('habits', habit, idToken),
    (habit: IHabit) =>
      produce(data, (draft: IHabit[]) => {
        draft.push(habit);
      })
  );

  const putHabit = createApiCaller<IHabit>(
    (habit: IHabit) => putter('habits', habit, idToken),
    (habit: IHabit) =>
      produce(data, (draft: IHabit[]) => {
        const habitIndex = draft.findIndex(h => h.id === habit.id);

        if (habitIndex !== -1) {
          draft[habitIndex] = habit;
        } else {
          console.error('Habit not found among local habits');
        }
      }),
    'Habit updated'
  );

  const deleteHabit = createApiCaller<IHabit>(
    (habit: IHabit) => deleter('habits', habit.id, idToken),
    (habit: IHabit) => data?.filter(h => h.id !== habit.id)
  );

  return {
    data,
    error,
    postEntry,
    deleteEntry,
    postHabit,
    putHabit,
    deleteHabit,
  };
}
