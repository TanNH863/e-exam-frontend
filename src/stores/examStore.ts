import { Exam, ExamStatus } from "@/dto/exam.dto";
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
    created_by_id: string | undefined
  ) => Promise<{ message: string; exam: Exam }>;
  getAllExam: () => Promise<Exam[]>;
  deleteExam: (id: string) => Promise<void>;
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
    created_by_id
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
  getAllExam: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam`, {
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
  deleteExam: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/exam/${id}`, {
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
}));
