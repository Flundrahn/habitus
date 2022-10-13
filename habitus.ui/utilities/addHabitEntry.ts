import { IEntry, IHabit } from "./interfaces";

export default function addHabitEntry (
  habitId: number,
  date: Date,
  setHabits: React.Dispatch<React.SetStateAction<IHabit[]>>
) {
  const newEntry: IEntry = {
    // TODO Make sure the id works when calling api, should set in db not here.
    // probably will make temporary object to send to api and then get back with id
    id: 0,
    habitId,
    date: date,
  };

  setHabits(currentHabits => currentHabits.map(habit => {
    // NOTE This is a collection of todays habits, each has a collection of entries or null, since it is only for today there should only be one entry, but can make method generalizable to handle existing collection of entries 

    let newEntries: IEntry[];

    if (habit.id === habitId) {
      if (habit.entries === undefined) {
        newEntries = [newEntry];
      } else {
        newEntries = [...habit.entries, newEntry];
      }
      return {
        ...habit,
        entries: newEntries,
      };
    } else {
      return habit;
    }
  }
  ));
}