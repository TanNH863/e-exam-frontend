import { Question } from "./question.dto";

export interface Exam {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  durationMinutes: number;
  status: ExamStatus;
  createdById: string;
  createdAt: Date;
}

export interface ExamInfo {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  durationMinutes: number;
  status: ExamStatus;
  createdById: string;
  createdAt: Date;
  questions: Question[];
}

export enum ExamStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  COMPLETED = "COMPLETED",
}
