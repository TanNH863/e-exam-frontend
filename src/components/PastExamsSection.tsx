"use client";

import { Exam } from "@/dto/exam.dto";
import { CheckCircleIcon } from "@/icons/icons";

interface Props {
  data: Exam[];
}

export default function PastExamsSection({ data }: Props) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {data.map((exam) => {
          const completedAt = new Date(exam.startTime);

          return (
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
                    Completed on{" "}
                    {completedAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-shrink-0 sm:mt-0 sm:ml-5">
                <a
                  href={`/student/exam-result/${exam.id}`}
                  className="ml-6 flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-300 transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Review
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
