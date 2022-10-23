import useSWR from 'swr';
import axios from 'axios';
import { IEntry, IHabit, IPostResponse } from './interfaces';
import API_BASE_URL from './constants';
import produce from 'immer';

const fetcher = (url: string) => axios.get(url).then(response => response.data);

const poster = async (uri: string, entity: IEntry | IHabit) => {
  const response = await axios.post<IPostResponse>(`${API_BASE_URL}/${uri}`, entity);

  if (response.status > 299) {
    throw new Error("Something went wrong while making a post request to API");
  }

  return response.data.id;
};

const putter = async (uri: string, entity: IEntry | IHabit) => {
  const response = await axios.put<IPostResponse>(`${API_BASE_URL}/${uri}/${entity.id}`, entity);

  if (response.status > 299) {
    throw new Error("Something went wrong while making a put request to API");
  }
};

const deleter = async (uri: string, id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${uri}/${id}`);

  if (response.status > 299) {
    throw new Error('Something went wrong while making a delete request to API');
  }
};

export default function useHabitusApi(startDate?: Date, endDate?: Date) {
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

  const { data, mutate, error } = useSWR<IHabit[]>(`${API_BASE_URL}/${fetchUri}`, fetcher);

  const postEntry = async (entry: IEntry) => {
    try {
      mutate(async () => {
        const id = await poster("entries", entry);
        const newEntry: IEntry = { ...entry, id };

        const updatedData = produce(data, (draft: IHabit[]) => {
          const habitIndex = draft.findIndex(h => h.id === entry.habitId);
          const entryIndex = draft[habitIndex].entries.findIndex(e => e.id === entry.id);

          if (entryIndex !== -1 && habitIndex !== -1) {
            draft[habitIndex].entries[entryIndex] = newEntry;
          } else {
            console.error("Entry not found among local habits");
          }
        });

        return updatedData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEntry = async (entry: IEntry) => {
    if (!entry.id) {
      console.error("Entry does not have an id");
    } else {
      try {
        mutate(async () => {
          await deleter("entries", entry.id);

          const updatedData = produce(data, (draft: IHabit[]) => {
            const habitIndex = draft.findIndex(h => h.id === entry.habitId);
            const entryIndex = draft[habitIndex].entries.findIndex(e => e.id === entry.id);

            if (entryIndex !== -1 && habitIndex !== -1) {
              draft[habitIndex].entries[entryIndex].id = 0;
              draft[habitIndex].entries[entryIndex].isCompleted = false;
            }
            else {
              console.error("Entry not found among local habits");
            }
          });

          return updatedData;
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const postHabit = async (habit: IHabit) => {
    try {
      mutate(async () => {
        const id = await poster("habits", habit);
        const newHabit: IHabit = { ...habit, id, entries: [] as IEntry[] };

        const updatedData = produce(data, (draft: IHabit[]) => {
          draft.push(newHabit);
        });

        return updatedData;
      });

    } catch (error) {
      console.error(error);
    }
  };

  const putHabit = async (habit: IHabit) => {
    try {
      mutate(async () => {
        await putter("habits", habit);

        const updatedData = produce(data, (draft: IHabit[]) => {
          const habitIndex = draft.findIndex(h => h.id === habit.id);

          if (habitIndex !== -1) {
            draft[habitIndex] = habit;
          } else {
            console.error("Habit not found among local habits");
          }
        });

        return updatedData;
      });

    } catch (error) {
      console.error(error);
    }
  };

  const deleteHabit = async (habit: IHabit) => {
    try {
      mutate(async () => {
        await deleter("habits", habit.id);

        return data?.filter(h => h.id !== habit.id);
      });

    } catch (error) {
      console.error(error);
    }
  };


  return { data, error, postEntry, deleteEntry, postHabit, putHabit, deleteHabit };
}

