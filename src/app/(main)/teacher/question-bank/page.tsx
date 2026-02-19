"use client";
import { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  SearchIcon,
  UploadIcon,
} from "@/icons/icons";
import { useQuestionStore } from "@/stores/questionStore";
import { Question, Option } from "@/dto/question.dto";
import Toast from "@/components/Toast";
import CreateQuestionModal from "@/components/CreateQuestionModal";

export default function QuestionBankPage() {
  const { createQuestion, getAllQuestions } = useQuestionStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const questionList = await getAllQuestions();
      setQuestions(questionList);
      console.log("Fetched questions:", questionList);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const filteredQuestions = questions.filter((question) =>
    question.question_text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleFileUpload = async (uploadFile: File) => {
    const fileToProcess = uploadFile ?? file;

    if (!fileToProcess) {
      setToastType("error");
      setToastMessage("No file selected!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(e.target?.result as ArrayBuffer);
        const worksheet = workbook.worksheets[0];

        if (!worksheet) {
          setToastType("error");
          setToastMessage("No worksheet found in the file!");
          return;
        }

        const { successCount, errorCount } = await processWorksheet(worksheet);
        await fetchQuestions();

        const message =
          successCount > 0
            ? `Successfully uploaded ${successCount} question${successCount > 1 ? "s" : ""}${errorCount > 0 ? ` (${errorCount} failed)` : ""}`
            : "Failed to upload questions. Please check the file format.";

        setToastType(successCount > 0 ? "success" : "error");
        setToastMessage(message);
        resetFileInput();
      } catch (error) {
        console.error("Error processing file:", error);
        setToastType("error");
        setToastMessage("Failed to process the file. Please check the format.");
      }
    };

    reader.readAsArrayBuffer(fileToProcess);
  };

  const processWorksheet = async (worksheet: ExcelJS.Worksheet) => {
    let successCount = 0;
    let errorCount = 0;

    for (let row = 2; row <= worksheet.rowCount; row++) {
      const cells = worksheet.getRow(row);
      const questionText = cells.getCell(1).value?.toString().trim();
      const questionType = cells.getCell(2).value?.toString().trim();

      if (!questionText || !questionType) continue;

      try {
        const options = getOptions(cells, questionType);
        await createQuestion(questionText, questionType, options);
        successCount++;
      } catch (error) {
        console.error(`Error creating question at row ${row}:`, error);
        errorCount++;
      }
    }

    return { successCount, errorCount };
  };

  const getOptions = (cells: ExcelJS.Row, questionType: string) => {
    const options: Option[] = [];

    if (
      ["MULTIPLE_CHOICE", "TRUE_FALSE", "MULTIPLE_ANSWER"].includes(
        questionType,
      )
    ) {
      const optionColumns = [
        [3, "A"],
        [4, "B"],
        [5, "C"],
        [6, "D"],
      ];
      const correctAnswer = cells.getCell(7).value?.toString().trim();

      optionColumns.forEach(([colIndex, label]) => {
        const optionText = cells.getCell(colIndex).value?.toString().trim();
        if (optionText) {
          options.push({
            option_text: optionText,
            is_correct: label === correctAnswer,
          });
        }
      });

      if (!options.some((opt) => opt.is_correct)) {
        throw new Error(
          `No correct answer found for question at row ${cells.number}`,
        );
      }
    } else if (questionType === "SHORT_ANSWER") {
      const acceptedAnswers = cells.getCell(7).value?.toString().split(";");
      acceptedAnswers?.forEach((answer) => {
        options.push({
          option_text: answer.trim(),
          is_correct: true,
        });
      });
    }

    return options;
  };

  const resetFileInput = () => {
    setFile(null);
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
        <Toast type={toastType} message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

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
                  console.log("selectedFile: ", selectedFile);
                  if (selectedFile) {
                    setFile(selectedFile);
                    handleFileUpload(selectedFile);
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
                        {`Q${index + 1}: ${question.question_text}`}
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
                      {question.question_type}
                    </div>
                    <div className="mt-4">
                      {question.question_type === "MULTIPLE_CHOICE" ||
                      question.question_type === "TRUE_FALSE" ? (
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
                                checked={option.is_correct === true}
                                readOnly
                              />
                              <label
                                htmlFor={`option-${question.id}-${i}`}
                                className={`ml-3 block text-sm text-gray-700 ${
                                  option.is_correct === true ? "font-bold" : ""
                                }`}>
                                {i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : i === 3 ? "D" : "Default"}. {option.option_text}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : question.question_type === "MULTIPLE_ANSWER" ? (
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
                                checked={option.is_correct === true}
                                readOnly
                              />
                              <label
                                htmlFor={`option-${question.id}-${i}`}
                                className={`ml-3 block text-sm text-gray-700 ${
                                  option.is_correct === true ? "font-bold" : ""
                                }`}>
                                {option.option_text}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : question.question_type === "SHORT_ANSWER" ? (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-semibold">
                            Accepted Answers:
                          </span>{" "}
                          {question.options
                            ?.filter((o) => o.is_correct)
                            .map((o) => o.option_text)
                            .join(", ")}
                        </div>
                      ) : (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-semibold">Correct Answer:</span>{" "}
                          {question.question_text}
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
