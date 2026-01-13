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

export const questions = [
  {
    id: "a81927df-6c1a-4967-9030-7d13bf5fbd8e",
    question_text: "Which country is NOT a part of UK?",
    question_type: "MULTIPLE_CHOICE",
    options: [
      {
        id: "9d53dfc6-d9ac-4660-9659-48436c8e9d6a",
        question_id: "a81927df-6c1a-4967-9030-7d13bf5fbd8e",
        option_text: "Ireland",
        is_correct: true,
      },
      {
        id: "20d1e8b9-37c3-4094-ba76-ee4a55de5722",
        question_id: "a81927df-6c1a-4967-9030-7d13bf5fbd8e",
        option_text: "Scotland",
        is_correct: false,
      },
      {
        id: "2d0c4e02-b4c6-429a-9571-6a5028856f97",
        question_id: "a81927df-6c1a-4967-9030-7d13bf5fbd8e",
        option_text: "England",
        is_correct: false,
      },
      {
        id: "61958f33-06c0-4300-ba7f-d3af0f9b10d1",
        question_id: "a81927df-6c1a-4967-9030-7d13bf5fbd8e",
        option_text: "Wales",
        is_correct: false,
      },
    ],
  },
  {
    id: "464741e7-f83d-49c3-b5be-28e905190321",
    question_text: "Is Northern Ireland a part of UK?",
    question_type: "TRUE_FALSE",
    options: [
      {
        id: "480b51c2-9c2d-49be-8ebd-7f907f8b0d2a",
        question_id: "464741e7-f83d-49c3-b5be-28e905190321",
        option_text: "True",
        is_correct: true,
      },
      {
        id: "276dd5b8-12b1-4669-bed6-42b72e6f0d83",
        question_id: "464741e7-f83d-49c3-b5be-28e905190321",
        option_text: "False",
        is_correct: false,
      },
    ],
  },
  {
    id: "ef9e6a58-b4a8-4ae2-8ce8-4b52198fe0b0",
    question_text: "Short Answer Question",
    question_type: "SHORT_ANSWER",
    options: [
      {
        id: "2d14b60b-ff22-4468-8f32-41c728fea5a6",
        question_id: "ef9e6a58-b4a8-4ae2-8ce8-4b52198fe0b0",
        option_text: "Short Answer 1",
        is_correct: true,
      },
      {
        id: "2293c402-ec04-47f6-bea2-6cb3853c3502",
        question_id: "ef9e6a58-b4a8-4ae2-8ce8-4b52198fe0b0",
        option_text: "Short Answer 2",
        is_correct: true,
      },
    ],
  },
  {
    id: "d1bd1adb-eaed-4b61-be3d-87bcdaa73a99",
    question_text: "Multiple Answer 1",
    question_type: "MULTIPLE_ANSWER",
    options: [
      {
        id: "3aeeb13e-8b85-4634-be39-6478b601d3b3",
        question_id: "d1bd1adb-eaed-4b61-be3d-87bcdaa73a99",
        option_text: "Option 1",
        is_correct: false,
      },
      {
        id: "9226b357-b4db-4d90-b83c-cc912c7d710e",
        question_id: "d1bd1adb-eaed-4b61-be3d-87bcdaa73a99",
        option_text: "Option 2",
        is_correct: false,
      },
      {
        id: "030b59c2-ccf2-406f-9fe3-2372cffbb6cd",
        question_id: "d1bd1adb-eaed-4b61-be3d-87bcdaa73a99",
        option_text: "Option 3",
        is_correct: false,
      },
      {
        id: "13ecede6-96a2-47db-9335-4af3e06ff497",
        question_id: "d1bd1adb-eaed-4b61-be3d-87bcdaa73a99",
        option_text: "Option 4",
        is_correct: false,
      },
    ],
  },
];
