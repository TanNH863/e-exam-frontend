"use client";

import { Exam } from "@/dto/exam.dto";
import UpcomingExamCard from "./UpcomingExamCard";

interface Props {
  data: Exam[];
}

export default function UpcomingExamsSection({ data }: Props) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
      {data.map((exam) => (
        <UpcomingExamCard key={exam.id} examInfo={exam} />
      ))}
    </div>
  )
}