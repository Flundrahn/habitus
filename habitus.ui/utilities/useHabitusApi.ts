import useSWR from 'swr';
import axios from 'axios';
import { IEntry, IHabit, IPostResponse } from './interfaces';
import API_BASE_URL from './constants';
import produce from 'immer';

const fetcher = (url: string) => axios.get(url).then(response => response.data);

const poster = async (uri: string, newEntity: IEntry | IHabit) => {
  const response = await axios.post<IPostResponse>(`${API_BASE_URL}/${uri}`, newEntity);

  if (response.status > 299) {
    throw new Error("Something went wrong while posting entity to API");
  }

  return response.data.id;
};

const deleter = async (uri: string, id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${uri}/${id}`);

  if (response.status > 299) {
    throw new Error('Something went wrong while deleting entity from API');
  }
};

export default function useHabitusApi(startDate: Date, endDate: Date = startDate) {
  const fetchUri = `habits/filter?startDate=${startDate.toDateString()}&endDate=${endDate.toDateString()}`;

  const { data, mutate, error } = useSWR<IHabit[]>(`${API_BASE_URL}/${fetchUri}`, fetcher);

  const postEntry = async (entry: IEntry) => {
    try {
      mutate(async () => {
        const id = await poster("entries", entry);
        const newEntry: IEntry = { ...entry, id };

        const updatedHabits = produce(data, (draft: IHabit[]) => {
          const habitIndex = draft.findIndex(h => h.id === entry.habitId);
          const entryIndex = draft[habitIndex].entries.findIndex(e => e.id === entry.id);

          if (entryIndex !== -1 && habitIndex !== -1) {
            draft[habitIndex].entries[entryIndex] = newEntry;
          } else {
            throw new Error("Entry not found among local habits");
          }
        });

        return updatedHabits;
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

          const updatedHabits = produce(data, (draft: IHabit[]) => {
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

          return updatedHabits;
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

        const updatedHabits = produce(data, (draft: IHabit[]) => {
          draft.push(newHabit);
        });

        return updatedHabits;
      });

    } catch (error) {
      console.error(error);
    }
  };

  return { data, error, postEntry, deleteEntry, postHabit };
}

