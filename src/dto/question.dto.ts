export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SHORT_ANSWER = "SHORT_ANSWER",
  MULTIPLE_ANSWER = "MULTIPLE_ANSWER",
  TRUE_FALSE = "TRUE_FALSE",
}

export const QuestionTypeSelect = [
  {
    value: QuestionType.MULTIPLE_CHOICE,
    label: "Multiple Choice",
  },
  {
    value: QuestionType.MULTIPLE_ANSWER,
    label: "Multiple Answer",
  },
  {
    value: QuestionType.SHORT_ANSWER,
    label: "Short Answer",
  },
  {
    value: QuestionType.TRUE_FALSE,
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
  questionType: QuestionType;
  options?: Option[];
}
