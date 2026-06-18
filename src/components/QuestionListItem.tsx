import { Question } from "@/dto/question.dto";
import { TrashIcon, PencilIcon } from "@/icons/icons";

interface Props {
  data: Question[];
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function QuestionListItem({ data, onEdit, onRemove }: Props) {
  const renderQuestionContent = (question: Question) => {
    switch (question.questionType) {
      case 1:
      case 4:
        return (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600">
              Options:
            </p>
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center pl-4">
                <input
                  id={`option-${question.id}-${i}`}
                  name={`question-${question.id}`}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={option.isCorrect === true}
                  readOnly
                />
                <label
                  htmlFor={`option-${question.id}-${i}`}
                  className={`ml-3 block text-sm text-gray-700 ${
                    option.isCorrect === true ? "font-bold" : ""
                  }`}>
                  {String.fromCharCode(65 + i)}. {option.optionText}
                </label>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600">
              Answers:
            </p>
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center pl-4">
                <input
                  id={`option-${question.id}-${i}`}
                  name={`question-${question.id}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={option.isCorrect === true}
                  readOnly
                />
                <label
                  htmlFor={`option-${question.id}-${i}`}
                  className={`ml-3 block text-sm text-gray-700 ${
                    option.isCorrect === true ? "font-bold" : ""
                  }`}>
                  {option.optionText}
                </label>
              </div>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">
              Accepted Answers:
            </span>{" "}
            {question.options
              ?.filter((o) => o.isCorrect)
              .map((o) => o.optionText)
              .join(", ")}
          </div>
        )
      default:
        return (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">Invalid question type</span>
          </div>
        )
    }
  }

  return (
    <>
      {data.map((question, index) => (
        <div
          key={question.id}
          className="rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between">
            <p className="text-lg font-medium text-gray-800">
              {`Q${index + 1}: ${question.questionText}`}
            </p>
            <div className="flex space-x-2">
              <button
                className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700 hover:cursor-pointer"
                onClick={() => {
                  if (onEdit) {
                    onEdit(question.id)
                  }
                }}
              >
                <PencilIcon />
              </button>
              <button
                className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-700 hover:cursor-pointer"
                onClick={() => {
                  if (onRemove) {
                    onRemove(question.id)
                  }
                }}
              >
                <TrashIcon />
              </button>
            </div>
          </div>
          <div className="mt-4">
            {renderQuestionContent(question)}
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No questions found.</p>
        </div>
      )}
    </>
  )
}