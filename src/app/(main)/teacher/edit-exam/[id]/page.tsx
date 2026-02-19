"use client";
import { useState, useEffect } from "react";
import {
  PlusCircleIcon,
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  XIcon,
} from "@/icons/icons";
import { useParams } from "next/navigation";
import { useExamStore } from "@/stores/examStore";
import { useQuestionStore } from "@/stores/questionStore";
import { ExamInfo, ExamStatus } from "@/dto/exam.dto";
import { Question as QuestionDTO } from "@/dto/question.dto";
import SelectQuestionsModal from "@/components/SelectQuestionsModal";
import Toast from "@/components/Toast";

export default function EditExamPage() {
  const params = useParams<{ id: string }>();
  const { getExamInfo } = useExamStore();
  const [exam, setExam] = useState<ExamInfo>();
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [submitType, setSubmitType] = useState<ExamStatus>(ExamStatus.DRAFT);

  useEffect(() => {
    fetchExamInfo();
  }, []);

  const fetchExamInfo = async () => {
    try {
      const examInfo = await getExamInfo(params.id);
      setExam(examInfo);
      console.log("Fetched exam info:", examInfo);
    } catch (error) {
      console.error("Error fetching exam info:", error);
      setToastMessage("Failed to load exam information");
      setToastType("error");
    }
  };

  const handleSelectQuestions = (selectedQuestions: QuestionDTO[]) => {
    setQuestions([...questions, ...selectedQuestions]);
    setToastMessage(
      `${selectedQuestions.length} question(s) added successfully`,
    );
    setToastType("success");
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
    setToastMessage("Question removed");
    setToastType("success");
  };

  return (
    <>
      <SelectQuestionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectQuestions={handleSelectQuestions}
        existingQuestionIds={questions.map((q) => q.id)}
      />
      {toastMessage && (
        <Toast type={toastType} message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      {/* Main Content */}
      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Title & Actions */}
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Exam Editor
            </h1>
            <div className="flex space-x-2">
              <button className="mt-4 flex items-center justify-center rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 shadow-md transition-all hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:mt-0">
                Save as draft
              </button>
              <button className="mt-4 flex items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
                <CheckCircleIcon />
                Publish
              </button>
            </div>
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
                    className="block text-sm font-medium text-gray-700">
                    Exam Title
                  </label>
                  <div className="mt-2 flex items-center">
                    <BookOpenIcon />
                    <p className="text-black">{exam?.title}</p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="exam-start-time"
                    className="block text-sm font-medium text-gray-700">
                    Start time
                  </label>
                  <div className="mt-2 flex items-center">
                    <ClockIcon />
                    <p className="text-black">{exam?.start_time.toString()}</p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="exam-duration"
                    className="block text-sm font-medium text-gray-700">
                    Duration (in minutes)
                  </label>
                  <div className="mt-2 flex items-center">
                    <ClockIcon />
                    <p className="text-black">{exam?.duration_minutes}</p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="exam-description"
                    className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-2 flex items-center">
                    <BookOpenIcon />
                    <p className="text-black">{exam?.description}</p>
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
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-green-300">
                <PlusCircleIcon />
                Add Question
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-lg bg-white p-6 shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <p className="mr-2 text-lg font-semibold text-gray-800">{`Q${
                        index + 1
                      }:`}</p>
                      <p className="text-lg text-gray-700">
                        {question.question_text}
                      </p>
                    </div>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-700">
                      <XIcon />
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Type:</span>{" "}
                    {question.question_type}
                  </div>
                  <div className="mt-4">
                    {question.question_type === "MULTIPLE_CHOICE" ||
                    question.question_type === "TRUE_FALSE" ? (
                      <div className="space-y-2">
                        {question.options?.map((option, i) => (
                          <div key={i} className="flex items-center">
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
                              {option.option_text}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : question.question_type === "MULTIPLE_ANSWER" ? (
                      <div className="space-y-2">
                        {question.options?.map((option, i) => (
                          <div key={i} className="flex items-center">
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
                        <span className="font-semibold">Accepted Answers:</span>{" "}
                        {question.options
                          ?.filter((o) => o.is_correct)
                          .map((o) => o.option_text)
                          .join(", ")}
                      </div>
                    ) : null}
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
    </>
  );
}
