export interface Answer {
	questionId: string;
	chosenOptionId?: string;
	chosenOptionIds?: string[];
	shortAnswerText?: string;
}

export interface Submission {
	studentId: string;
	status: number;
	answers: Answer[];
	complete: boolean;
}

export interface SubmissionResponse {
	id: string;
	examId: string;
	studentId: string;
	status: number;
	score: number;
}