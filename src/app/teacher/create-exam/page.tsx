"use client";
import { useState } from "react";
import {
  PlusCircleIcon,
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  XIcon,
} from "../../../icons/icons";

type Question = {
  text: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer: string;
};

export default function CreateExamPage() {
  const [examTitle, setExamTitle] = useState("");
  const [examDuration, setExamDuration] = useState(60);
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    // For now, we'll add a placeholder question.
    // In a real application, this would likely open a modal or a new form to add a question.
    setQuestions([
      ...questions,
      {
        text: "What is the capital of France?",
        type: "multiple-choice",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Title & Actions */}
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create New Exam
            </h1>
            <button className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
              <CheckCircleIcon />
              Save Exam
            </button>
          </div>

          {/* Exam Details Form */}
          <section className="mt-8">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Exam Details
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="exam-title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Exam Title
                  </label>
                  <div className="mt-2 flex items-center">
                    <BookOpenIcon />
                    <input
                      type="text"
                      name="exam-title"
                      id="exam-title"
                      className="ml-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      placeholder="e.g., Mid-Term Chemistry Exam"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="exam-duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (in minutes)
                  </label>
                  <div className="mt-2 flex items-center">
                    <ClockIcon />
                    <input
                      type="number"
                      name="exam-duration"
                      id="exam-duration"
                      className="ml-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                      value={examDuration}
                      onChange={(e) =>
                        setExamDuration(parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Questions Section */}
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
              <button
                onClick={addQuestion}
                className="flex items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                <PlusCircleIcon />
                Add Question
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <p className="mr-2 text-lg font-semibold text-gray-800">{`Q${
                        index + 1
                      }:`}</p>
                      <p className="text-lg text-gray-700">{question.text}</p>
                    </div>
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XIcon />
                    </button>
                  </div>
                  <div className="mt-4">
                    {question.type === "multiple-choice" && (
                      <div className="space-y-2">
                        {question.options?.map((option, i) => (
                          <div key={i} className="flex items-center">
                            <input
                              id={`option-${index}-${i}`}
                              name={`question-${index}`}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={option === question.correctAnswer}
                              readOnly
                            />
                            <label
                              htmlFor={`option-${index}-${i}`}
                              className="ml-3 block text-sm text-gray-700"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {questions.length === 0 && (
                <div className="text-center text-gray-500">
                  <p>No questions added yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
