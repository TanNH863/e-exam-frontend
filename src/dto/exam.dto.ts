import { Question } from "./question.dto";

export interface Exam {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  duration: number;
  status: number;
  createdById: string;
  createdAt: Date;
}

export interface ExamInfo extends Exam {
  examQuestions: Question[];
}

