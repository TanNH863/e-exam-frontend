"use client";

import { useEffect } from "react";
import { useExamStore } from "@/stores/examStore";
import UpcomingExamsSection from "@/components/UpcomingExamsSection";
import PastExamsSection from "@/components/PastExamsSection";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/stores/authStore";

export default function StudentDashboard() {
  // const { logout } = useAuthStore();
  // const router = useRouter();
  const { exams, getAllExams } = useExamStore();
  const upcomingExams = exams.filter((exam) => exam.status === 2);
  const completedExams = exams.filter((exam) => exam.status === 3);

  useEffect(() => {
    getAllExams();
  }, [getAllExams]);
  
  // const handleLogout = async () => {
  //   await logout();
  //   router.push("/login");
  // };

  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Welcome back, Student!
      </h1>

      {/* Upcoming Exams Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Upcoming Exams
        </h2>
        <UpcomingExamsSection data={upcomingExams} />
      </section>

      {/* Completed Exams Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Completed Exams
        </h2>
        <PastExamsSection data={completedExams} />
      </section>
    </>
  );
}
