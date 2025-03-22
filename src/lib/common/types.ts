import { DIFFICULTIES } from './constants';

type Difficulty = (typeof DIFFICULTIES)[number];

type Problem = {
	id: string;
	title: string;
	difficulty: Difficulty;
	tags: string[];
};

export { type Problem, type Difficulty };
