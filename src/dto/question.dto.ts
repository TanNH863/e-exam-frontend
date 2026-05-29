export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SHORT_ANSWER = "SHORT_ANSWER",
  MULTIPLE_ANSWER = "MULTIPLE_ANSWER",
  TRUE_FALSE = "TRUE_FALSE",
}

export const QuestionTypeSelect = [
  {
    value: 1,
    label: "Multiple Choice",
  },
  {
    value: 2,
    label: "Short Answer",
  },
  {
    value: 3,
    label: "Multiple Answer",
  },
  {
    value: 4,
    label: "True or False",
  },
];

export interface Option {
  optionText: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  questionType: number;
  options?: Option[];
}
