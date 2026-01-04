import { Option, Question } from "@/dto/question.dto";
import { create } from "zustand";

interface InitialState {
  question: Question | null;
  questions: Question[];
  error: string | null;
  isLoading: boolean;
  createQuestion: (
    question_text: string,
    question_type: string,
    options?: Option[]
  ) => Promise<{ message: string; question: Question }>;
  getAllQuestions: () => Promise<Question[]>;
  getQuestionInfo: (id: string) => Promise<Question>;
  deleteQuestion: (id: string) => Promise<void>;
}

export const useQuestionStore = create<InitialState>((set) => ({
  question: null,
  questions: [],
  error: null,
  isLoading: false,
  createQuestion: async (question_text, question_type, options) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question_text,
            question_type,
            options,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create question");
      }

      const newQuestion = await response.json();
      set((state) => ({
        questions: [...state.questions, newQuestion],
        isLoading: false,
      }));
      return newQuestion;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
    }
  },
  getAllQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exams");
      }
      const questionList = await response.json();
      set({ questions: questionList, isLoading: false });
      return questionList;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      return [];
    }
  },
  getQuestionInfo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exams");
      }
      const questionList = await response.json();
      set({ questions: questionList, isLoading: false });
      return questionList;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      return [];
    }
  },
  deleteQuestion: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/questions/${id}`, {
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
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
    }
  },
}));
