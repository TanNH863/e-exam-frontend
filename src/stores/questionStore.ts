import { Option, Question } from "@/dto/question.dto";
import { create } from "zustand";
import { apiFetch } from "@/utils/fetcher";

interface InitialState {
  question: Question | null;
  questions: Question[];
  error: string | null;
  isLoading: boolean;
  createQuestion: (
    questionText: string,
    questionType: string,
    options?: Option[],
  ) => Promise<{ message: string; question: Question } | undefined>;
  getAllQuestions: () => Promise<Question[]>;
  getQuestionInfo: (id: string) => Promise<Question | []>;
  deleteQuestion: (id: string) => Promise<void>;
  uploadFile: (file: File) => Promise<{ message: string } | undefined>;
}

export const useQuestionStore = create<InitialState>((set, get) => ({
  question: null,
  questions: [],
  error: null,
  isLoading: false,
  createQuestion: async (questionText, questionType, options) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch("/question", {
        method: "POST",
        body: JSON.stringify({
          questionText,
          questionType,
          options,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create question");
      }

      const newQuestion = await response.json();
      await get().getAllQuestions();
      return newQuestion;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
      throw error;
    }
  },
  getAllQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch("/questions");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exams");
      }
      const questionList = await response.json();
      set({ questions: questionList, isLoading: false });
      return questionList;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
      return [];
    }
  },
  getQuestionInfo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch(`/question/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exams");
      }
      const questionList = await response.json();
      set({ questions: questionList, isLoading: false });
      return questionList;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
      throw error;
    }
  },
  deleteQuestion: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch(`/question/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete exam");
      }
      set((state) => ({
        questions: state.questions.filter((q) => q.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
    }
  },
  uploadFile: async (file) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiFetch("/questions/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file");
      }

      const result = await response.json();
      set({ isLoading: false });
      return result;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
    }
  },
}));
