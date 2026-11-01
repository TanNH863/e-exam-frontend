import { create } from "zustand";
import { apiFetch } from "@/utils/fetcher";
import { StartExamResponse, Submission, SubmissionResponse } from "@/dto/submission.dto";

interface InitialState {
	submissions: SubmissionResponse[];
	error: string | null;
	isLoading: boolean;
	start: (examId: string, studentId: string) => Promise<StartExamResponse>;
	submitExam: (examId: string, submission: Submission) => Promise<SubmissionResponse>;
}

export const useSubmissionStore = create<InitialState>((set) => ({
	submissions: [],
	error: null,
	isLoading: false,
	start: async (examId, studentId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await apiFetch(`/start/${examId}`, {
				method: "POST",
				body: JSON.stringify({ studentId }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to start exam");
			}

			const submissionResponse: StartExamResponse = await response.json();
			set({ isLoading: false });
			return submissionResponse;
		} catch (error: unknown) {
			const msg = error instanceof Error ? error.message : "An unknown error occurred";
			set({ error: msg, isLoading: false });
			throw error;
		}
	},
	submitExam: async (examId, submission) => {
		set({ isLoading: true, error: null });
		try {
			const response = await apiFetch(`/submit/${examId}`, {
				method: "POST",
				body: JSON.stringify(submission),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to submit exam");
			}

			const submissionResponse = await response.json();
			set((state) => ({
				submissions: [...state.submissions, submissionResponse],
				isLoading: false,
			}));
			return submissionResponse;
		} catch (error: unknown) {
			const msg = error instanceof Error ? error.message : "An unknown error occurred";
			set({ error: msg, isLoading: false });
			throw error;
		}
	},
}));