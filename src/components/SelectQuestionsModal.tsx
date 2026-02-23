"use client";
import { useEffect, useState } from "react";
import { XIcon, SearchIcon } from "@/icons/icons";
import { useQuestionStore } from "@/stores/questionStore";
import { Question } from "@/dto/question.dto";

interface SelectQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestions: (selectedQuestions: string[]) => void;
  existingQuestionIds?: string[];
}

export default function SelectQuestionsModal({
  isOpen,
  onClose,
  onSelectQuestions,
  existingQuestionIds = [],
}: SelectQuestionsModalProps) {
  const { getAllQuestions } = useQuestionStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const questionList = await getAllQuestions();
      setQuestions(questionList);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuestions = questions.filter((question) =>
    question.question_text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handleAddQuestions = () => {
    onSelectQuestions(Array.from(selectedQuestions));
    setSelectedQuestions(new Set());
    setSearchTerm("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col max-h-[90vh] w-full max-w-2xl rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Questions from Question Bank
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">
            <XIcon />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-6 py-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                className="block w-full rounded-md border-black bg-white py-2 pl-10 text-black shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center text-gray-500">
                <p>Loading questions...</p>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>No questions found.</p>
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4">
                  <input
                    type="checkbox"
                    id={`question-${question.id}`}
                    checked={selectedQuestions.has(question.id)}
                    onChange={() => toggleQuestion(question.id)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`question-${question.id}`}
                    className="flex-1 cursor-pointer">
                    <p className="text-sm font-medium text-gray-900">
                      {question.question_text}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Type: {question.question_type}
                    </p>
                    {question.options && question.options.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {question.options.map((option, idx) => (
                          <div key={idx} className="text-sm text-gray-600">
                            <span className={option.is_correct ? "font-semibold" : ""}>
                              {idx === 0 ? "A" : idx === 1 ? "B" : idx === 2 ? "C" : idx === 3 ? "D" : "Default"}. {option.option_text}
                            </span>
                            {option.is_correct && (
                              <span className="ml-2 text-xs font-semibold text-green-600">
                                (Correct)
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex-shrink-0 flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 shadow-md transition-all hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200">
            Cancel
          </button>
          <button
            onClick={handleAddQuestions}
            disabled={selectedQuestions.size === 0 || isLoading}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Add{" "}
            {selectedQuestions.size > 0 ? `(${selectedQuestions.size})` : ""}{" "}
            Questions
          </button>
        </div>
      </div>
    </div>
  );
}
