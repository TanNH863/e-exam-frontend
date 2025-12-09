import { ExamStatus } from "@/dto/exam.dto";

export const mockTeacherExams = [
  {
    id: "86eb987b-96ab-4d51-84bd-be5f6740fa8b",
    title: "Mathematics 101 - Midterm",
    status: ExamStatus.PUBLISHED,
    description:
      "First mid-term exam covering chapters 1-5 of Mathematics 101.",
    start_time: new Date("2025-12-15T09:00:00Z"),
    duration_minutes: 90,
    created_by_id: "user-teacher-123",
    created_at: new Date("2025-11-20T10:30:00Z"),
  },
  {
    id: "461c95b2-1ad7-4295-b10d-12d2847bc532",
    title: "History of Art - Final Exam",
    status: ExamStatus.DRAFT,
    description:
      "Comprehensive final exam for History of Art, covering all course material.",
    start_time: new Date("2026-01-10T14:00:00Z"),
    duration_minutes: 180,
    created_by_id: "user-teacher-123",
    created_at: new Date("2025-12-01T16:00:00Z"),
  },
  {
    id: "735b9e2f-837f-4234-a62d-028bbd1742e5",
    title: "Physics 101 - Quiz 1",
    status: ExamStatus.COMPLETED,
    description:
      "First quiz for Physics 101, focused on foundational mechanics.",
    start_time: new Date("2025-11-05T11:00:00Z"),
    duration_minutes: 45,
    created_by_id: "user-teacher-456",
    created_at: new Date("2025-10-25T08:00:00Z"),
  },
];

export const mockTeacherStats = {
  activeExams: 5,
  needsGrading: 24,
  totalStudents: 150,
};

export const mockGradingQueue = [
  { id: 1, title: "English Literature - Essay", count: 9 },
  { id: 2, title: "Physics 101 - Short Answers", count: 15 },
];
