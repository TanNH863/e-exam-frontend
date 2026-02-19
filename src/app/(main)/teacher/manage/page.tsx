"use client";

import { useEffect, useState } from "react";
import { useExamStore } from "@/stores/examStore";
import { Exam } from "@/dto/exam.dto";
import { PlusCircleIcon } from "@/icons/icons";
import ExamsList from "@/components/ExamsList";
import CreateExamModal from "@/components/CreateExamModal";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";

export default function ManageExams() {
  const { getAllExams } = useExamStore();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const exams = await getAllExams();
      setExams(exams);
      console.log("Fetched exams:", exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
      setToastType("error");
      setToastMessage("Failed to fetch exams.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = (message: string) => {
    setToastMessage(message);
    setToastType("success")
    console.log(message);
    fetchExams();
  };

  return (
    <>
      {toastMessage && (
        <Toast type={toastType} message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">My Exams</h2>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                <PlusCircleIcon />
                Create Exam
              </button>
            </div>
            {loading ? (
              <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-lg">
                <Spinner />
              </div>
            ) : exams.length !== 0 ? (
              <ExamsList exams={exams} />
            ) : (
              <div className="flex items-center justify-center mt-4 pt-2 pb-2 overflow-hidden rounded-xl bg-white shadow-lg">
                <p className="text-black">No exams found</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <CreateExamModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
