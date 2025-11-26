"use client";

import { useState } from "react";
import {
  BarChartIcon,
  BookOpenIcon,
  BellIcon,
  ClipboardCheckIcon,
  EditIcon,
  FileTextIcon,
  LogoutIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@/icons/icons";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import CreateExamModal from "../../../components/CreateExamModal";
import { Toast } from "@/components/Toast";

export default function TeacherDashboard() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const mockTeacherStats = {
    activeExams: 5,
    needsGrading: 24,
    totalStudents: 150,
  };

  const mockTeacherExams = [
    {
      id: 1,
      title: "Mathematics 101 - Midterm",
      status: "Active",
      submissions: 30,
      total: 35,
    },
    {
      id: 2,
      title: "History of Art - Final Exam",
      status: "Draft",
      submissions: 0,
      total: 40,
    },
    {
      id: 3,
      title: "Physics 101 - Quiz 1",
      status: "Graded",
      submissions: 32,
      total: 32,
    },
  ];

  const mockGradingQueue = [
    { id: 1, title: "English Literature - Essay", count: 9 },
    { id: 2, title: "Physics 101 - Short Answers", count: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <CreateExamModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(msg) => setToastMessage(msg)}
      />
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      {/* Dashboard Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center font-bold text-2xl text-blue-600">
                <BookOpenIcon />
                <span>ExamPlatform</span>
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Manage Exams
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Question Bank
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Grading
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="mr-4 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

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
              className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0"
            >
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
            <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-lg">
              <ul role="list" className="divide-y divide-gray-200">
                {mockTeacherExams.map((exam) => (
                  <li
                    key={exam.id}
                    className="flex flex-col items-start justify-between p-6 sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-medium text-gray-900">
                          {exam.title}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          <span
                            className={`mr-2 inline-block h-2 w-2 rounded-full ${
                              exam.status === "Active"
                                ? "bg-green-500"
                                : exam.status === "Draft"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          {exam.status}
                          <span className="mx-2">|</span>
                          Submissions: {exam.submissions} / {exam.total}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-shrink-0 space-x-3 sm:mt-0 sm:ml-5">
                      <button className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <EditIcon />
                        Edit
                      </button>
                      <button className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-300 transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <BarChartIcon />
                        Analytics
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
                  className="overflow-hidden rounded-xl bg-white shadow-lg"
                >
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
    </div>
  );
}
