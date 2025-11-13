"use client";

import {
  BookOpenIcon,
  BellIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  ClockIcon,
  LogoutIcon,
} from "@/icons/icons";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const mockUpcomingExams = [
    {
      id: 1,
      title: "Mathematics 101 - Midterm",
      description: "Covers chapters 1-5.",
      date: "November 10, 2025",
      duration: 60,
    },
    {
      id: 2,
      title: "History of Art - Final Exam",
      description: "Cumulative final on all covered periods.",
      date: "November 12, 2025",
      duration: 120,
    },
  ];

  const mockCompletedExams = [
    {
      id: 3,
      title: "Physics 101 - Quiz 1",
      date: "November 1, 2025",
      score: 88,
    },
    {
      id: 4,
      title: "English Literature - Essay",
      date: "October 28, 2025",
      score: 92,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
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
                  My Exams
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Profile
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
              <button className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
          {/* Page Title */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back, Student!
          </h1>

          {/* Upcoming Exams Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Upcoming Exams
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              {mockUpcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <ClipboardListIcon />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exam.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {exam.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex space-x-4">
                        <span className="flex items-center text-sm text-gray-700">
                          <CalendarIcon />
                          {exam.date}
                        </span>
                        <span className="flex items-center text-sm text-gray-700">
                          <ClockIcon />
                          {exam.duration} mins
                        </span>
                      </div>
                      <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        Start Exam
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Completed Exams Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              Completed Exams
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-lg">
              <ul role="list" className="divide-y divide-gray-200">
                {mockCompletedExams.map((exam) => (
                  <li
                    key={exam.id}
                    className="flex flex-col items-start justify-between p-6 sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 flex-1 items-center">
                      <CheckCircleIcon />
                      <div className="min-w-0 flex-1 px-4">
                        <p className="truncate text-base font-medium text-gray-900">
                          {exam.title}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          Completed on {exam.date}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-bold text-gray-900">
                          {exam.score}
                        </span>
                        <span className="text-lg font-medium text-gray-500">
                          / 100
                        </span>
                      </div>
                      <a
                        href="#"
                        className="ml-6 flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-300 transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Review
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
