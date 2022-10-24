export interface IEntry {
  id: number;
  habitId: number;
  date: Date;
  isCompleted: boolean;
}

export interface IHabit {
  id: number;
  title: string;
  goal: number;
  score: number;
  color: string;
  description?: string;
  entries: IEntry[];
}

export interface IPostResponse {
  id: number;
}

export interface IQuote {
  id: number;
  quoteText: string;
  philosopher: string;
}
