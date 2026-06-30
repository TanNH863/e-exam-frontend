export const mockTeacherExams = [
  {
    id: "86eb987b-96ab-4d51-84bd-be5f6740fa8b",
    title: "Mathematics 101 - Midterm",
    status: 2,
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
    status: 1,
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
    status: 3,
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
  {
    id: "79ea3d73-1f87-479a-945e-0b5e509600e1",
    question_text: "What is the capital of France?",
    question_type: "MULTIPLE_CHOICE",
    options: [
      {
        id: "7c87503d-f678-41e3-a616-31026601da68",
        question_id: "79ea3d73-1f87-479a-945e-0b5e509600e1",
        option_text: "Berlin",
        is_correct: false,
      },
      {
        id: "bf479d24-58a3-41ae-871a-de15e4c4de26",
        question_id: "79ea3d73-1f87-479a-945e-0b5e509600e1",
        option_text: "Madrid",
        is_correct: false,
      },
      {
        id: "7b509a84-59f7-4088-8715-99c67fc0be5c",
        question_id: "79ea3d73-1f87-479a-945e-0b5e509600e1",
        option_text: "Paris",
        is_correct: true,
      },
      {
        id: "474692b5-089b-4277-a596-693ad4d8c3a0",
        question_id: "79ea3d73-1f87-479a-945e-0b5e509600e1",
        option_text: "Lisbon",
        is_correct: false,
      },
    ],
  },
  {
    id: "2decbbb4-19d3-45ef-9e0b-89d736012110",
    question_text: "Is the Earth flat?",
    question_type: "TRUE_FALSE",
    options: [
      {
        id: "93731c93-0e81-49d1-a5ea-a7f825e90247",
        question_id: "2decbbb4-19d3-45ef-9e0b-89d736012110",
        option_text: "True",
        is_correct: false,
      },
      {
        id: "6a51ecad1-eba6-457f-aa58-af2a1cc3cc79f",
        question_id: "2decbbb4-19d3-45ef-9e0b-89d736012110",
        option_text: "False",
        is_correct: true,
      },
    ],
  },
  {
    id: "c17dc810-b809-4612-ad99-004e2a4bec1e",
    question_text: "What is 2 + 2?",
    question_type: "SHORT_ANSWER",
    options: [
      {
        id: "966ce98e-df1e-43a6-a97a-225eee694489",
        question_id: "c17dc810-b809-4612-ad99-004e2a4bec1e",
        option_text: "4",
        is_correct: true,
      },
      {
        id: "b994ce1b-012b-4cc1-b6c0-364260700d1f",
        question_id: "c17dc810-b809-4612-ad99-004e2a4bec1e",
        option_text: "5",
        is_correct: false,
      },
    ],
  },
  {
    id: "4d05fa12-fdc8-44ca-a8cc-eedc8512c106",
    question_text: "Select all prime numbers.",
    question_type: "MULTIPLE_ANSWER",
    options: [
      {
        id: "848f5af2-050a-408b-9081-c030ce04d277",
        question_id: "4d05fa12-fdc8-44ca-a8cc-eedc8512c106",
        option_text: "2",
        is_correct: true,
      },
      {
        id: "d7e36408-7db7-49f9-8359-910dd0eb67f6",
        question_id: "4d05fa12-fdc8-44ca-a8cc-eedc8512c106",
        option_text: "4",
        is_correct: false,
      },
      {
        id: "132bfba0-595f-4991-9fa2-6ae8a263c70a",
        question_id: "4d05fa12-fdc8-44ca-a8cc-eedc8512c106",
        option_text: "5",
        is_correct: true,
      },
      {
        id: "127b72ec5c-1ee2-4384-8fa8-1463484d5ca3l",
        question_id: "4d05fa12-fdc8-44ca-a8cc-eedc8512c106",
        option_text: "6",
        is_correct: false,
      },
    ],
  },
  {
    id: "f3a2c9d4-7a1b-4c9d-9b3f-2a9a6f8e5d11",
    question_text: "Which planet is known as the Red Planet?",
    question_type: "MULTIPLE_CHOICE",
    options: [
      {
        id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
        question_id: "f3a2c9d4-7a1b-4c9d-9b3f-2a9a6f8e5d11",
        option_text: "Mars",
        is_correct: true,
      },
      {
        id: "b2c3d4e5-f6a7-8901-bcde-2345678901bc",
        question_id: "f3a2c9d4-7a1b-4c9d-9b3f-2a9a6f8e5d11",
        option_text: "Venus",
        is_correct: false,
      },
      {
        id: "c3d4e5f6-a7b8-9012-cdef-3456789012cd",
        question_id: "f3a2c9d4-7a1b-4c9d-9b3f-2a9a6f8e5d11",
        option_text: "Jupiter",
        is_correct: false,
      },
      {
        id: "d4e5f6a7-b8c9-0123-def0-4567890123de",
        question_id: "f3a2c9d4-7a1b-4c9d-9b3f-2a9a6f8e5d11",
        option_text: "Saturn",
        is_correct: false,
      },
    ],
  },
  {
    id: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c44",
    question_text: "Is water composed of hydrogen and oxygen?",
    question_type: "TRUE_FALSE",
    options: [
      {
        id: "e5f6a7b8-c9d0-1234-ef01-5678901234ef",
        question_id: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c44",
        option_text: "True",
        is_correct: true,
      },
      {
        id: "f6a7b8c9-d0e1-2345-f012-6789012345f0",
        question_id: "a9b8c7d6-e5f4-3a2b-1c0d-9e8f7a6b5c44",
        option_text: "False",
        is_correct: false,
      },
    ],
  },
  {
    id: "b7c6d5e4-f3a2-1b0c-9d8e-7f6a5b4c3d22",
    question_text: "What is the square root of 16?",
    question_type: "SHORT_ANSWER",
    options: [
      {
        id: "g7h8i9j0-k1l2-3456-gh78-90123456gh78",
        question_id: "b7c6d5e4-f3a2-1b0c-9d8e-7f6a5b4c3d22",
        option_text: "4",
        is_correct: true,
      },
      {
        id: "h8i9j0k1-l2m3-4567-hi89-01234567hi89",
        question_id: "b7c6d5e4-f3a2-1b0c-9d8e-7f6a5b4c3d22",
        option_text: "5",
        is_correct: false,
      },
    ],
  },
  {
    id: "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e33",
    question_text: "Select all programming languages.",
    question_type: "MULTIPLE_ANSWER",
    options: [
      {
        id: "i9j0k1l2-m3n4-5678-ij90-12345678ij90",
        question_id: "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e33",
        option_text: "Python",
        is_correct: true,
      },
      {
        id: "j0k1l2m3-n4o5-6789-jk01-23456789jk01",
        question_id: "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e33",
        option_text: "HTML",
        is_correct: false,
      },
      {
        id: "k1l2m3n4-o5p6-7890-kl12-34567890kl12",
        question_id: "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e33",
        option_text: "Java",
        is_correct: true,
      },
      {
        id: "l2m3n4o5-p6q7-8901-lm23-45678901lm23",
        question_id: "c5d4e3f2-a1b0-9c8d-7e6f-5a4b3c2d1e33",
        option_text: "CSS",
        is_correct: false,
      },
    ],
  },
  {
    id: "d3e2f1a0-b9c8-7d6e-5f4a-3b2c1d0e4f55",
    question_text: "Which ocean is the largest?",
    question_type: "MULTIPLE_CHOICE",
    options: [
      {
        id: "m3n4o5p6-q7r8-9012-mn34-56789012mn34",
        question_id: "d3e2f1a0-b9c8-7d6e-5f4a-3b2c1d0e4f55",
        option_text: "Atlantic Ocean",
        is_correct: false,
      },
      {
        id: "n4o5p6q7-r8s9-0123-no45-67890123no45",
        question_id: "d3e2f1a0-b9c8-7d6e-5f4a-3b2c1d0e4f55",
        option_text: "Indian Ocean",
        is_correct: false,
      },
      {
        id: "o5p6q7r8-s9t0-1234-op56-78901234op56",
        question_id: "d3e2f1a0-b9c8-7d6e-5f4a-3b2c1d0e4f55",
        option_text: "Pacific Ocean",
        is_correct: true,
      },
      {
        id: "p6q7r8s9-t0u1-2345-pq67-89012345pq67",
        question_id: "d3e2f1a0-b9c8-7d6e-5f4a-3b2c1d0e4f55",
        option_text: "Arctic Ocean",
        is_correct: false,
      },
    ],
  },
];

export const mockUsers = [
  {
    id: "10c94c3c-8a86-4a3b-a09f-610f507876c9",
    email: "user1@admin.gmail.com",
    full_name: "Full Name 1",
    role: "ADMIN",
    created_at: "2026-01-24T03:20:45.387Z",
  },
  {
    id: "4e32c49c-d9c2-465a-9a96-694a85dc309a",
    email: "user2@teacher.gmail.com",
    full_name: "Full Name 2",
    role: "TEACHER",
    created_at: "2026-01-24T06:17:13.166Z",
  },
  {
    id: "173e1958-4169-41cd-81c0-c82b2ef71ef7",
    email: "user3@student.gmail.com",
    full_name: "Full Name 3",
    role: "STUDENT",
    created_at: "2026-01-25T06:17:13.166Z",
  },
];

export const notifications = [
  { id: 1, text: "New exam assigned: Math 101" },
  { id: 2, text: "Your exam results are in for Physics." },
  { id: 3, text: "Reminder: Exam on Friday." },
];

export const profileItems = [
  { id: 1, text: "My Profile" },
];

export const DUMMY_EXAM = {
  id: "a0799fcf-ac25-4711-98c9-b49be3943212",
  title: "Sample Exam",
  description: "This is a sample exam for demonstration purposes.",
  startTime: new Date("2024-06-15T10:00:00Z"),
  duration: 60,
  status: 2,
  createdById: "user-teacher-123",
  createdAt: new Date("2024-06-10T08:00:00Z"),
  examQuestions: [
    {
      id: "62ef48a8-1bf6-4539-ba80-0964b5776d0d",
      questionText: "What is the capital of France?",
      questionType: 1,
      options: [
        { optionText: "Paris", isCorrect: true },
        { optionText: "London", isCorrect: false },
        { optionText: "Berlin", isCorrect: false },
        { optionText: "Madrid", isCorrect: false },
      ],
    },
    {
      id: "0f3123f3-5aed-4fc2-af6a-54abf8167693",
      questionText: "What is 2 + 2?",
      questionType: 1,
      options: [
        { optionText: "3", isCorrect: false },
        { optionText: "4", isCorrect: true },
        { optionText: "5", isCorrect: false },
        { optionText: "6", isCorrect: false },
      ],
    },
    {
      id: "f1445b97-203a-4dca-8220-ae8cc8372884",
      questionText: "Which planet is known as the Red Planet?",
      questionType: 1,
      options: [
        { optionText: "Earth", isCorrect: false },
        { optionText: "Mars", isCorrect: true },
        { optionText: "Jupiter", isCorrect: false },
        { optionText: "Saturn", isCorrect: false },
      ],
    },
  ],
};
