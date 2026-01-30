"use client";

import { ChartBarIcon, EditIcon } from "@/icons/icons";
import { Exam } from "@/dto/exam.dto";
import { useRouter } from "next/navigation";

interface ExamsListProps {
  exams: Exam[];
}

export default function ExamsList({ exams }: ExamsListProps) {
  const router = useRouter();

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {exams.map((exam) => (
        <li
          key={exam.id}
          className="flex flex-col items-start justify-between p-6 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-medium text-gray-900">
                {exam.title}
              </p>
              <p className="flex items-center text-sm text-gray-500">
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${
                    exam.status === "PUBLISHED"
                      ? "bg-green-500"
                      : exam.status === "DRAFT"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}></span>
                {exam.status}
                {/* <span className="mx-2">|</span>
                    Submissions: {exam.submissions} / {exam.total} */}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-shrink-0 space-x-3 sm:mt-0 sm:ml-5">
            <button
              onClick={() => {
                router.push("/teacher/edit-exam/" + exam.id);
                console.log("Edit button clicked for exam:", exam.id);
              }}
              className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <EditIcon />
              Edit
            </button>
            <button className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-300 transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <ChartBarIcon />
              Analytics
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
