export interface ILink {
  href: string;
  label: string;
}

export interface IEntry {
  id: number;
  userId?: string;
  habitId: number;
  date: Date;
  isCompleted: boolean;
}

export interface IHabit {
  id: number;
  userId?: string;
  title: string;
  goal: number;
  score?: number;
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

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  idToken: string;
}
