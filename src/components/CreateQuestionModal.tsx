"use client";

import { useState, useEffect } from "react";
import { XIcon } from "@/icons/icons";
import { QuestionType, QuestionTypeSelect } from "@/dto/question.dto";
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
    QuestionType.MULTIPLE_CHOICE,
  );
  const [options, setOptions] = useState([
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
  ]);

  useEffect(() => {
    if (questionType === QuestionType.TRUE_FALSE) {
      setOptions([
        { optionText: "True", isCorrect: true },
        { optionText: "False", isCorrect: false },
      ]);
    } else if (questionType === QuestionType.SHORT_ANSWER) {
      setOptions([{ optionText: "", isCorrect: true }]);
    } else {
      setOptions([
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ]);
    }
  }, [questionType]);

  const renderOptions = () => {
    switch (questionType) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionChange(index, "optionText", e.target.value)
                  }
                  className="p-2 block w-full rounded-md border-1 border-black sm:text-sm text-black"
                  required
                />
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleOptionChange(index, "isCorrect", e.target.checked)
                  }
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <label className="text-black">Correct</label>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 hover:cursor-pointer">
              Add Option
            </button>
          </>
        );
      case QuestionType.MULTIPLE_ANSWER:
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Answers (students can select more than one option)
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionChange(index, "optionText", e.target.value)
                  }
                  className="p-2 block w-full rounded-md border-1 border-black sm:text-sm text-black"
                  required
                />
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleOptionChange(index, "isCorrect", e.target.checked)
                  }
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <label className="text-black">Correct</label>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 hover:cursor-pointer">
              Add Option
            </button>
          </>
        );
      case QuestionType.SHORT_ANSWER:
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Accepted Answers (students can type their own answer)
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder={`Accepted Answer ${index + 1}`}
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionChange(index, "optionText", e.target.value)
                  }
                  className="p-2 block w-full rounded-md border-1 border-black sm:text-sm text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 hover:cursor-pointer">
              Add Accepted Answer
            </button>
          </>
        );
      case QuestionType.TRUE_FALSE:
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Answer
            </label>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                name="true_false_option"
                checked={options[0]?.isCorrect === true}
                onChange={() =>
                  setOptions([
                    { optionText: "True", isCorrect: true },
                    { optionText: "False", isCorrect: false },
                  ])
                }
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-black">True</label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                name="true_false_option"
                checked={options[1]?.isCorrect === true}
                onChange={() =>
                  setOptions([
                    { optionText: "True", isCorrect: false },
                    { optionText: "False", isCorrect: true },
                  ])
                }
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-black">False</label>
            </div>
          </>
        );
    }
  };

  const handleOptionChange = (
    index: number,
    field: "optionText" | "isCorrect",
    value: string | boolean,
  ) => {
    const newOptions = [...options];
    if (field === "optionText" && typeof value === "string") {
      newOptions[index].optionText = value;
    } else if (field === "isCorrect" && typeof value === "boolean") {
      newOptions[index].isCorrect = value;
    }
    setOptions(newOptions);
  };

  const addOption = () => {
    const newOption =
      questionType === QuestionType.SHORT_ANSWER
        ? { optionText: "", isCorrect: true }
        : { optionText: "", isCorrect: false };
    setOptions([...options, newOption]);
  };

  const removeOption = (index: number) => {
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
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
            <XIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="questionText"
              className="block text-sm font-medium text-gray-700">
              Question Text
            </label>
            <textarea
              placeholder="Type your question here..."
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={3}
              className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              required></textarea>
          </div>
          <div>
            <label
              htmlFor="questionType"
              className="block text-sm font-medium text-gray-700">
              Question Type
            </label>
            <select
              id="questionType"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black">
              {QuestionTypeSelect.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>{renderOptions()}</div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400 hover:cursor-pointer">
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:cursor-pointer">
              Create Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
