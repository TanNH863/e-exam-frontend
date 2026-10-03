'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ExamInfo } from '@/dto/exam.dto';
import { useAuthStore } from "@/stores/authStore";
import { useExamStore } from '@/stores/examStore';
import { useSubmissionStore } from '@/stores/submissionStore';
import Spinner from '@/components/Spinner';
import MessageModal from '@/components/MessageModal';
import { Answer, Submission } from '@/dto/submission.dto';

export default function TakeExamPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { getExamInfo } = useExamStore();
  const { submitExam } = useSubmissionStore();
  const [exam, setExam] = useState<ExamInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [submission, setSubmission] = useState({
    studentId: "",
    status: 1,
    answers: [] as Array<Answer>,
    complete: true,
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const fetchedExam = await getExamInfo(id as string);
          setExam(fetchedExam);
          setTimeLeft(fetchedExam.duration * 60);

          const initialAnswers = fetchedExam.examQuestions.map((question) => ({
            questionId: question.id,
            chosenOptionId: "",
          }));

          setSubmission({
            studentId: user?.id || "",
            status: 1,
            answers: initialAnswers,
            complete: true,
          });
        } catch (err) {
          console.error('Error fetching exam:', err);
        }
      };
      fetchData();
    }
  }, [id, getExamInfo, user?.id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));

    setSubmission(prevRequestBody => ({
      ...prevRequestBody,
      answers: prevRequestBody.answers.map(answer =>
        answer.questionId === questionId
          ? { ...answer, chosenOptionId: optionId }
          : answer
      ),
    }));
  };

  const handleMarkQuestion = (questionId: string) => {
    setMarked(prevMarked => ({
      ...prevMarked,
      [questionId]: !prevMarked[questionId],
    }));
  };

  const handleSubmit = async () => {
    try {
      const examId = Array.isArray(id) ? id[0] : id;

      if (!examId) {
        return;
      }

      const payload: Submission = {
        ...submission,
        studentId: user?.id || submission.studentId || "",
      };

      await submitExam(examId, payload);
      router.push(`/student/exam-result/${examId}`);
    } catch (error) {
      console.error("Submit exam failed:", error);
      alert("Failed to submit exam. Please try again.");
    }
  };

  if (!exam) {
    return <Spinner />;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative">
      <div className="md:flex md:items-start md:gap-6">
        <div className="md:flex-1">
          <h1 className="text-2xl text-black font-bold mb-4">{exam.title}</h1>
          <p className="mb-4 text-black">{exam.description}</p>
          <div className="text-red-500 font-bold mb-4">Time Left: {formatTime(timeLeft)}</div>
          <div>
            {exam.examQuestions.map((question, index) => (
              <div
                id={question.id}
                key={question.id}
                className={`mb-6 p-4 border bg-white rounded-lg ${marked[question.id] ? 'bg-yellow-100' : ''}`}
              >
                <h2 className="text-lg text-black font-semibold">{`${index + 1}. ${question.questionText}`}</h2>
                <div className="mt-2">
                  {question.options?.map((option, i) => (
                    <div key={i} className="flex items-center mb-2 text-black">
                      <input
                        type="radio"
                        name={question.id}
                        id={`${question.id}-${i}`}
                        value={option.id}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleAnswerChange(question.id, option.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`${question.id}-${i}`}>{option.optionText}</label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="flex items-center text-gray-600">
                    <input
                      type="checkbox"
                      checked={marked[question.id] || false}
                      onChange={() => handleMarkQuestion(question.id)}
                      className="mr-2"
                    />
                    Mark as not yet completed
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer"
          >
            Submit Exam
          </button>
        </div>

        <aside className="hidden md:block md:w-44">
          <div className="sticky top-32 border bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Questions</h3>
            <div className="flex flex-wrap gap-2">
              {exam.examQuestions.map((q, idx) => {
                const answered = !!answers[q.id];
                const isMarkedQ = !!marked[q.id];
                const bgClass = answered
                  ? 'bg-green-500 text-white'
                  : isMarkedQ
                  ? 'bg-yellow-300 text-black'
                  : 'bg-transparent text-black border border-gray-300';

                return (
                  <button
                    key={q.id}
                    onClick={() => document.getElementById(q.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    aria-label={`Go to question ${idx + 1}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-blue-500 hover:text-white ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <MessageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOk={handleSubmit}
        title="Submit exam?"
        message="Are you sure you want to submit this exam? Once submitted, you cannot change your answers."
      />
    </div>
  );
}