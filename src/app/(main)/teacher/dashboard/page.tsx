"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardCheckIcon,
  FileTextIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@/icons/icons";
import { useAuthStore } from "@/stores/authStore";
import { useExamStore } from "@/stores/examStore";
import CreateExamModal from "@/components/CreateExamModal";
import Toast from "@/components/Toast";
import ExamsList from "@/components/ExamsList";
import Spinner from "@/components/Spinner";
import { Exam } from "@/dto/exam.dto";
import { mockTeacherStats, mockGradingQueue } from "../../../../../mock.data";

export default function TeacherDashboard() {
  // const { logout } = useAuthStore();
  const { getAllExams } = useExamStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  // const handleLogout = async () => {
  //   await logout();
  //   router.replace("/login");
  // };

  const fetchExams = async () => {
    setLoading(true);
    try {
      const exams = await getAllExams();
      setExams(exams);
      console.log("Fetched exams:", exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CreateExamModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(msg) => setToastMessage(msg)}
      />
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Main Content */}
      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Title & Actions */}
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back, Teacher!
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
              <PlusCircleIcon />
              Create New Exam
            </button>
          </div>

          {/* Stats Overview Section */}
          <section className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Stat Card 1 */}
              <div className="overflow-hidden rounded-xl bg-white p-6 shadow-lg">
                <div className="flex items-center">
                  <FileTextIcon />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Active Exams
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockTeacherStats.activeExams}
                    </p>
                  </div>
                </div>
              </div>
              {/* Stat Card 2 */}
              <div className="overflow-hidden rounded-xl bg-white p-6 shadow-lg">
                <div className="flex items-center">
                  <ClipboardCheckIcon />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Needs Grading
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockTeacherStats.needsGrading}
                    </p>
                  </div>
                </div>
              </div>
              {/* Stat Card 3 */}
              <div className="overflow-hidden rounded-xl bg-white p-6 shadow-lg">
                <div className="flex items-center">
                  <UsersIcon />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Students
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockTeacherStats.totalStudents}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Exam List */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900">My Exams</h2>
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

          {/* Grading Queue */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              Grading Queue
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              {mockGradingQueue.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl bg-white shadow-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.count} new submissions to review.
                    </p>
                    <button className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
                      Start Grading
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
