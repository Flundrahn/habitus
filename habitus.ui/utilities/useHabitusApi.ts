import useSWR from 'swr';
import axios from 'axios';
import { IEntry, IHabit, IPostResponse } from './interfaces';
import API_BASE_URL from './constants';
import produce from 'immer';

const fetcher = (url: string) => axios.get(url).then(response => response.data);

const poster = async (uri: string, newEntity: IEntry | IHabit) => {
  const { data } = await axios.post<IPostResponse>(`${API_BASE_URL}/${uri}`, newEntity);
  
  return data.id;
}; 

// const deleter = async (url: string) => await axios.delete(url).then(response => response.data);

// TODO Validate that default endDate value is working
export default function useHabitusApi(startDate: string, endDate: string = startDate) {
  const fetchUri = `habits/filter?startDate=${startDate}&endDate=${endDate}`;
  
  const { data, mutate, error } = useSWR(`${API_BASE_URL}/${fetchUri}`, fetcher);

  // TODO may have to handle errors here
  const postEntry = async (entry: IEntry) => {
    mutate(async () => {

      const id = await poster("entries", entry);
      const newEntry: IEntry = { ...entry, id };
      
      const updatedHabits = produce(data, (draft: IHabit[]) => {
        const habitIndex = draft.findIndex(h => h.id === entry.habitId);
        const entryIndex = draft[habitIndex].entries.findIndex(e => e.id === entry.id);

        if (entryIndex !== -1 && habitIndex !== -1) {
          draft[habitIndex].entries[entryIndex] = newEntry;
        }
        else {
          throw new Error("Entry not found among local habits");
        }
      });
        
      return updatedHabits;
    });
  };

    

  // updates the local data immediately
  // send a request to update the data
  // triggers a revalidation (refetch) to make sure our local data is correct
  // mutate('/api/user', updateFn(user), options);

  // mutate(key, user => ({ ...user, name: "Sergio" }))

  return { data, error, postEntry };
}

// Produce recipe function does not have to return, the call to produce will return draft item anyway!
// const nextState = produce(baseState, draftState => {
//   draftState.push({title: "Tweet about it"})
//   draftState[1].done = true
// })

// MUTATE OPTIONS
// const options = { optimisticData: user, rollbackOnError: true }


