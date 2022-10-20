export interface IWeek {
	id: number;
	name: string;
	entries?: IEntry[];  // NOTE Confirm the nullable property work as expected
}

export interface IEntry {
	id?: number;
	habitId: number; // NOTE May remove this later if not needed
	date: Date;
	isCompleted: boolean;
}

export interface IHabit {
	id: number;
	title: string;
	goal: number;
	color: string;
	description?: string;
	entries: IEntry[]; // NOTE If there are no entries the api returns an empty array
}

export interface IPostResponse {
	id: number;
}
