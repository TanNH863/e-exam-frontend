import {
  CalendarIcon,
  ClipboardListIcon,
  ClockIcon,
} from "@/icons/icons";
import { Exam } from "@/dto/exam.dto";
import { getTimeDisplay } from "@/utils/date";

interface Props {
  data: Exam[];
}

export default function UpcomingExamsSection({ data }: Props) {
  const getExamStatus = (startTime: string | Date, duration: number) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);

    if (now < start) {
      return "Upcoming";
    } else if (now >= start && now <= end) {
      return "Ongoing";
    } else {
      return "Ended";
    }
  };

  return (
    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
      {data.map((exam) => (
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
                  {getTimeDisplay(new Date(exam.startTime))}
                </span>
                <span className="flex items-center text-sm text-gray-700">
                  <ClockIcon />
                  {exam.duration} mins
                </span>
                <span className="flex items-center text-sm text-gray-700">
                  {getExamStatus(exam.startTime, exam.duration)}
                </span>
              </div>
              <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300">
                Start Exam
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}