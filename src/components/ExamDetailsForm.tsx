import { ExamInfo } from "@/dto/exam.dto";
import { BookOpenIcon, ClockIcon } from "@/icons/icons";
import { getTimeDisplay } from "@/utils/date";

interface Props {
  exam: ExamInfo | undefined;
}

export default function ExamDetailsForm({ exam }: Props) {
  const renderInfo = () => {  
    if (exam) {
      return (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="exam-title"
              className="block text-sm font-medium text-gray-700"
            >
              Exam Title
            </label>
            <div className="mt-2 flex items-center">
              <BookOpenIcon />
              <p className="text-black">{exam.title}</p>
            </div>
          </div>
          <div>
            <label
              htmlFor="exam-start-time"
              className="block text-sm font-medium text-gray-700"
            >
              Start time
            </label>
            <div className="mt-2 flex items-center">
              <ClockIcon />
              <p className="text-black">
                {getTimeDisplay(new Date(exam.startTime))}
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="exam-duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (in minutes)
            </label>
            <div className="mt-2 flex items-center">
              <ClockIcon />
              <p className="text-black">{exam?.duration}</p>
            </div>
          </div>
          <div>
            <label
              htmlFor="exam-description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-2 flex items-center">
              <BookOpenIcon />
              <p className="text-black">{exam?.description}</p>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <p>No data was found</p>
        </div>
      );
    }
  }

  return (
    <section className="mt-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Exam Details</h2>
        {renderInfo()}
      </div>
    </section>
  );
}
