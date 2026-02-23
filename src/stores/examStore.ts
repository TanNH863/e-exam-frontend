import { Exam, ExamInfo, ExamStatus } from "@/dto/exam.dto";
import { create } from "zustand";

interface InitialState {
  exam: Exam | null;
  exams: Exam[];
  error: string | null;
  isLoading: boolean;
  createExam: (
    title: string,
    description: string,
    start_time: Date,
    duration_minutes: number,
    status: ExamStatus,
    created_by_id: string | undefined,
  ) => Promise<{ message: string; exam: Exam }>;
  getAllExams: () => Promise<Exam[]>;
  getExamInfo: (id: string) => Promise<ExamInfo>;
  deleteExam: (id: string) => Promise<void>;
  updateExamQuestions: (id: string, question_ids: string[], status: ExamStatus) => Promise<{ message: string }>;
}

export const useExamStore = create<InitialState>((set) => ({
  exam: null,
  exams: [],
  error: null,
  isLoading: false,
  createExam: async (
    title,
    description,
    start_time,
    duration_minutes,
    status,
    created_by_id,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          start_time,
          duration_minutes,
          status,
          created_by_id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create exam");
      }

      const newExam = await response.json();
      set((state) => ({
        exams: [...state.exams, newExam],
        isLoading: false,
      }));
      return newExam;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
    }
  },
  getAllExams: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
        method: "GET",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exams");
      }
      const exams = await response.json();
      set({ exams, isLoading: false });
      return exams;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      return [];
    }
  },
  getExamInfo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exam/${id}`,
        {
          method: "GET",
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch exam info");
      }
      const examInfo = await response.json();
      set({ exam: examInfo, isLoading: false });
      return examInfo;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      throw error;
    }
  },
  deleteExam: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete exam");
      }
      set((state) => ({
        exams: state.exams.filter((exam) => exam.id !== id),
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
  updateExamQuestions: async (id, question_ids, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam/${id}/questions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question_ids, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update exam questions');
      }
      
      const result = await response.json();
      set({ isLoading: false });
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'An unknown error occurred', isLoading: false });
      }
      throw error;
    }
  },
}));
