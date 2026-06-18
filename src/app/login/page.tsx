"use client";

import { BookOpenIcon, ArrowLeftIcon } from "@/icons/icons";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.id.startsWith("ST")) {
        router.push("/student/dashboard");
      }
      else if (user.id.startsWith("TC")) {
        router.push("/teacher/dashboard");
      }
      else if (user.id.startsWith("AD")) {
        router.push("/admin/dashboard");
      }
      else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mx-auto flex w-auto items-center justify-center text-blue-600">
            <BookOpenIcon />
            <span className="ml-2 text-3xl font-bold">ExamPlatform</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
          <LoginForm />
          <p className="mt-6 text-center text-sm text-gray-600">
            Not a member?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500">
              Start your 14-day free trial
            </a>
          </p>
        </div>

        <Link
          href="/"
          className="group flex w-full items-center justify-center rounded-lg py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-200 hover:text-gray-900">
          <ArrowLeftIcon />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
