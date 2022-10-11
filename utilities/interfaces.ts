export interface IWeek {
	id: number;
	name: string;
	entries?: IEntry[];  // NOTE Confirm the nullable property work as expected
}

export interface IEntry {
	id: number;
	habitId: number; // NOTE May remove this later if not needed
	date: Date;
}

export interface IHabit {
	id: number;
	title: string;
	goal: number;
	color: string;
	entries?: IEntry[]; // NOTE Confirm the nullable property work as expected
}
