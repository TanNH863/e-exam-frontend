import { BookOpenIcon } from "@/icons/icons";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center font-bold text-2xl text-blue-600">
            <BookOpenIcon />
            <span>ExamPlatform</span>
          </div>
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login / Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto flex h-full flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            The Modern Solution for
            <span className="block text-blue-600">Online Examinations</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
            A secure, scalable, and intuitive platform designed for teachers and
            students. Create, manage, and take exams with confidence.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Get Started
              <svg
                className="ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} ExamPlatform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
