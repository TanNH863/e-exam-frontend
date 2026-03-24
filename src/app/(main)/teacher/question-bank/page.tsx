'use client';
import { useEffect, useState } from 'react';
import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  SearchIcon,
  UploadIcon,
} from "@/icons/icons";
import { useQuestionStore } from "@/stores/questionStore";
import { Question } from "@/dto/question.dto";
import Toast from "@/components/Toast";
import CreateQuestionModal from "@/components/CreateQuestionModal";
import Spinner from "@/components/Spinner";

export default function QuestionBankPage() {
  const { questions, isLoading, getAllQuestions, uploadFile } = useQuestionStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    getAllQuestions();
  }, [getAllQuestions]);

  const filteredQuestions = questions.filter((question) =>
    question.questionText.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleFileUpload = async (file: File) => {
    if (!file) {
      setToastType("error");
      setToastMessage("No file selected!");
      return;
    }

    try {
      const response = await uploadFile(file);
      if (response && response.message) {
        setToastType("success");
        setToastMessage(response.message);
        getAllQuestions();
      } else {
        throw new Error("Failed to upload file.");
      }
    } catch (error: any) {
      setToastType("error");
      setToastMessage(error.message || "An unknown error occurred.");
    }
  };

  const resetFileInput = () => {
    const fileInput = document.getElementById(
      "file-upload",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <>
      <CreateQuestionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(msg) => setToastMessage(msg)}
      />
      {toastMessage && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {isLoading && <Spinner />}

      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Question Bank
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(true)}
                className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
                <PlusCircleIcon />
                Add New Question
              </button>
              <label
                htmlFor="file-upload"
                className="mt-4 flex items-center justify-center rounded-lg bg-[#1D6F42] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-green-800 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
                <UploadIcon />
                Upload from Excel
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    handleFileUpload(selectedFile);
                    resetFileInput();
                  }
                }}
              />
            </div>
          </div>

          <section className="mt-8">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  All Questions
                </h2>
                <div className="w-1/3 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search questions..."
                    className="p-2 pl-10 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {filteredQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <p className="text-lg font-medium text-gray-800">
                        {`Q${index + 1}: ${question.questionText}`}
                      </p>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700 hover:cursor-pointer">
                          <PencilIcon />
                        </button>
                        <button className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-700 hover:cursor-pointer">
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Type:</span>{" "}
                      {question.questionType}
                    </div>
                    <div className="mt-4">
                      {question.questionType === "MULTIPLE_CHOICE" ||
                      question.questionType === "TRUE_FALSE" ? (
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
                                {i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : i === 3 ? "D" : "Default"}. {option.optionText}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : question.questionType === "MULTIPLE_ANSWER" ? (
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
                      ) : question.questionType === "SHORT_ANSWER" ? (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-semibold">
                            Accepted Answers:
                          </span>{" "}
                          {question.options
                            ?.filter((o) => o.isCorrect)
                            .map((o) => o.optionText)
                            .join(", ")}
                        </div>
                      ) : (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-semibold">Correct Answer:</span>{" "}
                          {question.questionText}
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
    </>
  );
}
