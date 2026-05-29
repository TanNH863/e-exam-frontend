'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { PlusCircleIcon, SearchIcon, UploadIcon } from "@/icons/icons";
import { useQuestionStore } from "@/stores/questionStore";
import Toast from "@/components/Toast";
import CreateQuestionModal from "@/components/CreateQuestionModal";
import Spinner from "@/components/Spinner";
import QuestionListItem from '@/components/QuestionListItem';

export default function QuestionBankPage() {
  const { questions, isLoading, getAllQuestions, uploadFile } = useQuestionStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAllQuestions();
  }, [getAllQuestions]);

  const filteredQuestions = useMemo(() => {
    if (!searchTerm) return questions;
    return questions.filter((question) =>
      question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [questions, searchTerm]);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
                className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0"
              >
                <PlusCircleIcon /> Add New Question
              </button>
              <label
                htmlFor="file-upload"
                className="mt-4 flex items-center justify-center rounded-lg bg-[#1D6F42] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-green-800 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0"
              >
                <UploadIcon /> Upload from Excel
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                ref={fileInputRef}
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
                <QuestionListItem data={filteredQuestions} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
