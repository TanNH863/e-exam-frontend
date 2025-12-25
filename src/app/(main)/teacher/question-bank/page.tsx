"use client";

import { useEffect, useState } from "react";
import { useExamStore } from "@/stores/examStore";
import { Exam } from "@/dto/exam.dto";
import ExamsList from "@/components/ExamsList";

export default function QuestionBank() {
  const { getAllExams } = useExamStore();
  const [exams, setExams] = useState<Exam[]>([]);

  const fetchExams = async () => {
    try {
      const exams = await getAllExams();
      setExams(exams);
      console.log("Fetched exams:", exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <>
      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">My Exams</h2>
            <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-lg">
              <ExamsList exams={exams} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
