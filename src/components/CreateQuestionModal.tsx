"use client";

import { useState } from "react";
import { BookOpenIcon, XIcon } from "@/icons/icons";
import { QuestionType } from "@/dto/question.dto";
import { useQuestionStore } from "@/stores/questionStore";

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

export default function CreateQuestionModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateQuestionModalProps) {
  const { createQuestion } = useQuestionStore();
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.MULTIPLE_CHOICE
  );
  const [options, setOptions] = useState([
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
  ]);

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { option_text: "", is_correct: false }]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createQuestion(questionText, questionType, options);
    if (response) {
      onSuccess?.("Question created successfully!");
    }
    console.log(response);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Add New Question</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            <XIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="questionText"
              className="block text-sm font-medium text-gray-700"
            >
              Question Text
            </label>
            <textarea
              placeholder="Type your question here..."
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={3}
              className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="questionType"
              className="block text-sm font-medium text-gray-700"
            >
              Question Type
            </label>
            <select
              id="questionType"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
            >
              {Object.values(QuestionType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option.option_text}
                  onChange={(e) =>
                    handleOptionChange(index, "option_text", e.target.value)
                  }
                  className="p-2 block w-full rounded-md border-1 border-black sm:text-sm text-black"
                  required
                />
                <input
                  type="checkbox"
                  checked={option.is_correct}
                  onChange={(e) =>
                    handleOptionChange(index, "is_correct", e.target.checked)
                  }
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <label>Correct</label>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 hover:cursor-pointer"
            >
              Add Option
            </button>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400 hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:cursor-pointer"
            >
              Create Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
