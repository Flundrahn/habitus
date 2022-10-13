import { IHabit } from "./interfaces";

export default function removeHabitEntry(
  habitId: number,
  entryId: number,
  setHabits: React.Dispatch<React.SetStateAction<IHabit[]>>
) {
  setHabits(currentHabits => currentHabits.map(habit => {
    if (habit.id === habitId) {
      habit.entries = habit.entries?.filter(entry => entry.id !== entryId);
    }
    return habit;
  }));
}