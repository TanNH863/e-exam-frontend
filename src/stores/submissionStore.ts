import { create } from "zustand";
import { apiFetch } from "@/utils/fetcher";
import { Submission, SubmissionResponse } from "@/dto/submission.dto";

interface InitialState {
	submissions: SubmissionResponse[];
	error: string | null;
	isLoading: boolean;
	submitExam: (examId: string, submission: Submission) => Promise<SubmissionResponse>;
}

export const useSubmissionStore = create<InitialState>((set) => ({
	submissions: [],
	error: null,
	isLoading: false,
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