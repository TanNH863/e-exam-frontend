export interface Exam {
  id: string;
  title: string;
  description: string;
  start_time: Date;
  duration_minutes: number;
  status: ExamStatus;
  created_by_id: string;
  created_at: Date;
}

export interface ExamInfo {
  id: string;
  title: string;
  description: string;
  start_time: Date;
  duration_minutes: number;
  status: ExamStatus;
  created_by_id: string;
  created_at: Date;
  questions: Exam[];
}

export enum ExamStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  COMPLETED = "COMPLETED",
}
