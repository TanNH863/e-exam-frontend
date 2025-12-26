"use client";
import { useState } from "react";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@/icons/icons";

type Question = {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer: string;
};

const initialQuestions: Question[] = [
  {
    id: "1",
    text: "What is the powerhouse of the cell?",
    type: "multiple-choice",
    options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
    correctAnswer: "Mitochondria",
  },
  {
    id: "2",
    text: "The Earth is flat.",
    type: "true-false",
    correctAnswer: "False",
  },
  {
    id: "3",
    text: "What is the formula for water?",
    type: "short-answer",
    correctAnswer: "H2O",
  },
];

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Question Bank
          </h1>
          <button className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
            <PlusCircleIcon />
            Add New Question
          </button>
        </div>

        <section className="mt-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                All Questions
              </h2>
              <div className="w-1/3">
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {filteredQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-lg font-medium text-gray-800">
                      {`Q${index + 1}: ${question.text}`}
                    </p>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700">
                        <PencilIcon />
                      </button>
                      <button className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-700">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Type:</span> {question.type}
                  </div>
                  <div className="mt-4">
                    {question.type === "multiple-choice" ? (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-600">Options:</p>
                        {question.options?.map((option, i) => (
                          <div key={i} className="flex items-center pl-4">
                            <input
                              id={`option-${question.id}-${i}`}
                              name={`question-${question.id}`}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={option === question.correctAnswer}
                              readOnly
                            />
                            <label
                              htmlFor={`option-${question.id}-${i}`}
                              className="ml-3 block text-sm text-gray-700"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Correct Answer:</span>{" "}
                        {question.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredQuestions.length === 0 && (
                <div className="text-center text-gray-500">
                  <p>No questions found.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}