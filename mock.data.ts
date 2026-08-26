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
    "id": "06dfd75a-6f30-426f-bd56-8ac2e3838dcb",
    "questionText": "Which European country is shaped like a boot?",
    "questionType": 1,
    "options": [
      {
        "id": "70d565a2-d9a0-465b-90fe-851a0e5584d4",
        "questionId": "06dfd75a-6f30-426f-bd56-8ac2e3838dcb",
        "optionText": "Portugal",
        "isCorrect": false
      },
      {
        "id": "83b98188-01a4-46a7-9858-cc61535c4e8f",
        "questionId": "06dfd75a-6f30-426f-bd56-8ac2e3838dcb",
        "optionText": "Italy",
        "isCorrect": true
      },
      {
        "id": "5991e07c-0216-4a9b-9d03-d4f76d9e576d",
        "questionId": "06dfd75a-6f30-426f-bd56-8ac2e3838dcb",
        "optionText": "Greece",
        "isCorrect": false
      },
      {
        "id": "942e9b37-5c9f-4c0d-9e19-698aa93083d7",
        "questionId": "06dfd75a-6f30-426f-bd56-8ac2e3838dcb",
        "optionText": "Spain",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "08494a1d-f6a3-4912-8f7d-5b549c32427a",
    "questionText": "What is the name of the line of latitude at 0 degrees?",
    "questionType": 1,
    "options": [
      {
        "id": "ec91c690-6646-4ae0-a1c1-41221554bd17",
        "questionId": "08494a1d-f6a3-4912-8f7d-5b549c32427a",
        "optionText": "Equator",
        "isCorrect": true
      },
      {
        "id": "e15c1d12-5be5-4ece-8d00-a8aa8d48dd5c",
        "questionId": "08494a1d-f6a3-4912-8f7d-5b549c32427a",
        "optionText": "Tropic of Capricorn",
        "isCorrect": false
      },
      {
        "id": "ebb4cbdf-8ce6-4420-b1ec-d764cd2a19a4",
        "questionId": "08494a1d-f6a3-4912-8f7d-5b549c32427a",
        "optionText": "Tropic of Cancer",
        "isCorrect": false
      },
      {
        "id": "9433ede4-c0e0-4c14-a3bf-d8cabeb2897b",
        "questionId": "08494a1d-f6a3-4912-8f7d-5b549c32427a",
        "optionText": "Prime Meridian",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "0b47422b-5f0f-485f-bfb7-40eee491a623",
    "questionText": "What is the capital of Germany?",
    "questionType": 1,
    "options": [
      {
        "id": "c44f0c4e-4dee-4055-ac50-ef8fd322c311",
        "questionId": "0b47422b-5f0f-485f-bfb7-40eee491a623",
        "optionText": "Munich",
        "isCorrect": false
      },
      {
        "id": "1af22c3e-3d34-48c3-abdc-69cd260cfb49",
        "questionId": "0b47422b-5f0f-485f-bfb7-40eee491a623",
        "optionText": "Frankfurt",
        "isCorrect": false
      },
      {
        "id": "c850d8c1-f9e9-41d3-8148-72f624d73660",
        "questionId": "0b47422b-5f0f-485f-bfb7-40eee491a623",
        "optionText": "Hamburg",
        "isCorrect": false
      },
      {
        "id": "01786b52-f656-48de-945b-0055f23a9d2f",
        "questionId": "0b47422b-5f0f-485f-bfb7-40eee491a623",
        "optionText": "Berlin",
        "isCorrect": true
      }
    ]
  },
  {
    "id": "0cdf5319-2521-43c1-be78-d7f1fc2e1965",
    "questionText": "The Great Barrier Reef is off the coast of which country?",
    "questionType": 1,
    "options": [
      {
        "id": "000dfb36-72ee-44ff-bbaa-f7e44126c0a6",
        "questionId": "0cdf5319-2521-43c1-be78-d7f1fc2e1965",
        "optionText": "South Africa",
        "isCorrect": false
      },
      {
        "id": "acc07f47-0c4d-4ccb-a880-3a124f6bf707",
        "questionId": "0cdf5319-2521-43c1-be78-d7f1fc2e1965",
        "optionText": "Australia",
        "isCorrect": true
      },
      {
        "id": "36bfd705-d3ca-4b8c-9c6f-3f6135a3659d",
        "questionId": "0cdf5319-2521-43c1-be78-d7f1fc2e1965",
        "optionText": "Brazil",
        "isCorrect": false
      },
      {
        "id": "447bda58-f32d-4532-8e24-0f141b4179ea",
        "questionId": "0cdf5319-2521-43c1-be78-d7f1fc2e1965",
        "optionText": "Mexico",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "12a0fb3e-c889-4114-a45b-ad4cd03b2b85",
    "questionText": "What is the largest island in the world?",
    "questionType": 1,
    "options": [
      {
        "id": "217d7750-2155-4444-a2d3-5b1aba6fbb22",
        "questionId": "12a0fb3e-c889-4114-a45b-ad4cd03b2b85",
        "optionText": "Great Britain",
        "isCorrect": false
      },
      {
        "id": "7e1f6bbf-5c4f-4492-8885-ebaa54c6fe03",
        "questionId": "12a0fb3e-c889-4114-a45b-ad4cd03b2b85",
        "optionText": "Madagascar",
        "isCorrect": false
      },
      {
        "id": "de037500-dafe-4e2d-9c1e-cc5c870ed4f4",
        "questionId": "12a0fb3e-c889-4114-a45b-ad4cd03b2b85",
        "optionText": "Greenland",
        "isCorrect": true
      },
      {
        "id": "f6dd7daf-4c49-4c15-8ad6-b37f386746a2",
        "questionId": "12a0fb3e-c889-4114-a45b-ad4cd03b2b85",
        "optionText": "New Guinea",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "1c776f74-afff-40dd-8ed7-fbc5a61697aa",
    "questionText": "Which country has the longest coastline in the world?",
    "questionType": 1,
    "options": [
      {
        "id": "d268117b-20da-4672-81e3-583418b6d018",
        "questionId": "1c776f74-afff-40dd-8ed7-fbc5a61697aa",
        "optionText": "Australia",
        "isCorrect": false
      },
      {
        "id": "eb640989-89a4-4d5e-88ed-c94b660e9951",
        "questionId": "1c776f74-afff-40dd-8ed7-fbc5a61697aa",
        "optionText": "Indonesia",
        "isCorrect": false
      },
      {
        "id": "184eede9-ecc3-4182-9baa-6d9f18c291fb",
        "questionId": "1c776f74-afff-40dd-8ed7-fbc5a61697aa",
        "optionText": "Russia",
        "isCorrect": false
      },
      {
        "id": "25603d93-49cb-402f-8b3b-b457d1b75e08",
        "questionId": "1c776f74-afff-40dd-8ed7-fbc5a61697aa",
        "optionText": "Canada",
        "isCorrect": true
      }
    ]
  },
  {
    "id": "1d90dbf4-b4ec-4ac8-b85d-4fcc038f1bf1",
    "questionText": "Which country has the largest land area?",
    "questionType": 1,
    "options": [
      {
        "id": "a2283341-a475-4e97-9888-89f753e5b7d3",
        "questionId": "1d90dbf4-b4ec-4ac8-b85d-4fcc038f1bf1",
        "optionText": "China",
        "isCorrect": false
      },
      {
        "id": "58d800f3-5719-4452-8bfc-0e206a5f107c",
        "questionId": "1d90dbf4-b4ec-4ac8-b85d-4fcc038f1bf1",
        "optionText": "USA",
        "isCorrect": false
      },
      {
        "id": "305faf98-e546-4eed-8cf8-b961a736603b",
        "questionId": "1d90dbf4-b4ec-4ac8-b85d-4fcc038f1bf1",
        "optionText": "Canada",
        "isCorrect": false
      },
      {
        "id": "f9cc10f3-0443-403d-b8a0-49fdd7b638be",
        "questionId": "1d90dbf4-b4ec-4ac8-b85d-4fcc038f1bf1",
        "optionText": "Russia",
        "isCorrect": true
      }
    ]
  },
  {
    "id": "1eff587d-e285-4805-86dd-99b225b31d25",
    "questionText": "What is the approximate circumference of the Earth at the equator?",
    "questionType": 1,
    "options": [
      {
        "id": "4801e265-e1dc-4a94-86b6-0856592b32ec",
        "questionId": "1eff587d-e285-4805-86dd-99b225b31d25",
        "optionText": "40075 km",
        "isCorrect": true
      },
      {
        "id": "08e448e6-1cd5-4076-bf1d-2a32d6e0e06c",
        "questionId": "1eff587d-e285-4805-86dd-99b225b31d25",
        "optionText": "20000 km",
        "isCorrect": false
      },
      {
        "id": "7f8957d9-3dcc-49d8-9009-1dd4bc281ea5",
        "questionId": "1eff587d-e285-4805-86dd-99b225b31d25",
        "optionText": "60000 km",
        "isCorrect": false
      },
      {
        "id": "140d3460-48e2-42d0-b62c-539f4fa9c400",
        "questionId": "1eff587d-e285-4805-86dd-99b225b31d25",
        "optionText": "100000 km",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "1fcd4a65-6a56-4f79-a20a-6af40ca2c522",
    "questionText": "Which is the longest river in South America?",
    "questionType": 1,
    "options": [
      {
        "id": "df31dd37-af09-4ca0-bfb9-69d82272c8ee",
        "questionId": "1fcd4a65-6a56-4f79-a20a-6af40ca2c522",
        "optionText": "Parana",
        "isCorrect": false
      },
      {
        "id": "0ab80ae5-2410-4322-9f25-31f4e621a215",
        "questionId": "1fcd4a65-6a56-4f79-a20a-6af40ca2c522",
        "optionText": "Orinoco",
        "isCorrect": false
      },
      {
        "id": "2dca2d71-8730-4139-8981-283f64af8bbd",
        "questionId": "1fcd4a65-6a56-4f79-a20a-6af40ca2c522",
        "optionText": "Amazon",
        "isCorrect": true
      },
      {
        "id": "2bd422f1-63cc-4a50-b340-5c65a17273ce",
        "questionId": "1fcd4a65-6a56-4f79-a20a-6af40ca2c522",
        "optionText": "Magdalena",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "218f3a11-445c-4961-aa53-62343df01537",
    "questionText": "What is the capital of India?",
    "questionType": 1,
    "options": [
      {
        "id": "70a10beb-e07d-4b5b-944b-d8e0b5ca6dbe",
        "questionId": "218f3a11-445c-4961-aa53-62343df01537",
        "optionText": "Kolkata",
        "isCorrect": false
      },
      {
        "id": "acdf2f34-f385-4466-b53d-b0c79ec84268",
        "questionId": "218f3a11-445c-4961-aa53-62343df01537",
        "optionText": "Chennai",
        "isCorrect": false
      },
      {
        "id": "da4097a4-d15a-4c96-a5a2-0acd6a8de6f7",
        "questionId": "218f3a11-445c-4961-aa53-62343df01537",
        "optionText": "Mumbai",
        "isCorrect": false
      },
      {
        "id": "29476acf-b954-480b-b1cb-a5d6796bef43",
        "questionId": "218f3a11-445c-4961-aa53-62343df01537",
        "optionText": "New Delhi",
        "isCorrect": true
      }
    ]
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
