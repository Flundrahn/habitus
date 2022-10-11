import type { IWeek, IHabit, IEntry } from './interfaces';

// NOTE Probably should do as much calculations as possible on the server side,
// and let API return exactly what is needed for each page.

const weekData: IWeek[] = [
  { id: 1, name: 'Week 1' },
  { id: 2, name: 'Week 2' },
  { id: 3, name: 'Week 3' },
  { id: 4, name: 'Week 4' },
];


const entryData1: IEntry[] = [
  { id: 1, date: new Date(2022, 9, 10), habitId: 1 },
  { id: 2, date: new Date(2022, 9, 11), habitId: 1 },
  { id: 3, date: new Date(2022, 9, 12), habitId: 1 },
  { id: 4, date: new Date(2022, 9, 14), habitId: 1 },
];

const entryData2: IEntry[] = [
  { id: 5, date: new Date(2022, 9, 11), habitId: 2 },
  { id: 6, date: new Date(2022, 9, 13), habitId: 2 },
  { id: 8, date: new Date(2022, 9, 14), habitId: 2 },
];

const habitsToday: IHabit[] = [
  {
    id: 1,
    title: 'Workout 15 min',
    goal: 5,
    color: '#32a852',
    entries: entryData1.filter(entry => entry.date.toDateString() === new Date().toDateString())
  },
  {
    id: 2,
    title: 'French',
    goal: 4,
    color: '#3236a8',
    entries: entryData2.filter(entry => entry.date.toDateString() === new Date().toDateString()),
  },
  {
    id: 3,
    title: 'Awake before 8am',
    goal: 4,
    color: '#962da8',
    // entries: entryData2.filter(entry => entry.date.toDateString() === new Date().toDateString()),
  }
];

export { weekData, habitsToday };
