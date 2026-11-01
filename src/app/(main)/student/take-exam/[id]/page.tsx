'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type { ExamInfo } from '@/dto/exam.dto';
import { useAuthStore } from "@/stores/authStore";
import { useExamStore } from '@/stores/examStore';
import { useSubmissionStore } from '@/stores/submissionStore';
import Spinner from '@/components/Spinner';
import MessageModal from '@/components/MessageModal';
import type { Submission, TimerSnapshot } from '@/dto/submission.dto';

const getRemainingSeconds = (deadline: number, clockOffset: number) =>
  Math.max(0, Math.ceil((deadline - (Date.now() + clockOffset)) / 1000));

export default function TakeExamPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const studentId = user?.id;
  const { getExamInfo } = useExamStore();
  const { start, submitExam } = useSubmissionStore();
  const [exam, setExam] = useState<ExamInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [timerError, setTimerError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const submissionRef = useRef<Submission>({
    studentId: "",
    status: 1,
    answers: [],
    complete: true,
  });
  const initializationRef = useRef<{
    key: string;
    promise: Promise<{ exam: ExamInfo; start: Awaited<ReturnType<typeof start>> }>;
  } | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const deadlineRef = useRef(0);
  const clockOffsetRef = useRef(0);
  const isSubmittingRef = useRef(false);
  const autoSubmitTriggeredRef = useRef(false);
  const handleSubmitRef = useRef<(automatic?: boolean) => Promise<void>>(async () => {});

  const handleSubmit = useCallback(async (automatic = false) => {
    if (isSubmittingRef.current) return;

    const examId = Array.isArray(id) ? id[0] : id;
    if (!examId) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload: Submission = {
        ...submissionRef.current,
        studentId: studentId || submissionRef.current.studentId,
      };

      await submitExam(examId, payload);
      router.push(`/student/exam-result/${examId}`);
    } catch (error) {
      console.error("Submit exam failed:", error);
      if (automatic) {
        setSubmitError("Automatic submission failed. Please submit your exam manually.");
      } else {
        alert("Failed to submit exam. Please try again.");
      }
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [id, studentId, submitExam, router]);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    const examId = Array.isArray(id) ? id[0] : id;
    if (!examId || !studentId) return;

    const key = `${examId}:${studentId}`;
    if (initializationRef.current?.key !== key) {
      const promise = (async () => {
        const fetchedExam = await getExamInfo(examId);
        const started = await start(examId, studentId);
        return { exam: fetchedExam, start: started };
      })();
      initializationRef.current = { key, promise };
    }

    let active = true;
    const initialization = initializationRef.current;
    if (!initialization) return;

    initialization.promise
      .then(({ exam: fetchedExam, start: started }) => {
        if (!active) return;

        const initialAnswers = fetchedExam.examQuestions.map((question) => ({
          questionId: question.id,
          chosenOptionId: "",
        }));
        submissionRef.current = {
          studentId,
          status: 1,
          answers: initialAnswers,
          complete: true,
        };
        setExam(fetchedExam);
        setAnswers({});

        const serverTime = Date.parse(started.serverTime);
        const endsAt = Date.parse(started.endsAt);
        if (Number.isFinite(serverTime) && Number.isFinite(endsAt)) {
          clockOffsetRef.current = serverTime - Date.now();
          deadlineRef.current = endsAt;
          setTimeLeft(getRemainingSeconds(endsAt, clockOffsetRef.current));
          setTimerActive(true);
        } else {
          setTimerError("The server returned an invalid exam deadline.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
        const socketUrl =
          process.env.NEXT_PUBLIC_SOCKET_URL ||
          new URL(apiUrl, window.location.origin).origin;
        const socket = io(socketUrl, { withCredentials: true, autoConnect: false });
        socketRef.current = socket;

        socket.on("connect", () => {
          setTimerError(null);
          socket.emit("timer:join", { submissionId: started.id, studentId });
        });
        socket.on("timer:tick", (snapshot: TimerSnapshot) => {
          const serverNow = Date.parse(snapshot.serverTime);
          const deadline = Date.parse(snapshot.endsAt);
          if (!Number.isFinite(serverNow) || !Number.isFinite(deadline)) {
            setTimerError("The server sent an invalid timer update.");
            return;
          }

          clockOffsetRef.current = serverNow - Date.now();
          deadlineRef.current = deadline;
          setTimeLeft(getRemainingSeconds(deadline, clockOffsetRef.current));
          setTimerActive(true);
        });
        socket.on("timer:expired", () => {
          deadlineRef.current = Date.now() - clockOffsetRef.current;
          setTimeLeft(0);
          setTimerActive(false);
          if (!autoSubmitTriggeredRef.current) {
            autoSubmitTriggeredRef.current = true;
            void handleSubmitRef.current(true);
          }
        });
        socket.on("timer:error", (error: { message?: string }) => {
          setTimerError(error.message || "Unable to synchronize the exam timer.");
        });
        socket.on("connect_error", () => {
          setTimerError("Connection to the exam timer was lost. Reconnecting…");
        });
        socket.connect();
      })
      .catch((error: unknown) => {
        if (active) {
          console.error("Error starting exam:", error);
          setLoadError(error instanceof Error ? error.message : "Unable to start exam.");
        }
      });

    return () => {
      active = false;
      const socket = socketRef.current;
      if (socket) {
        socket.emit("timer:leave");
        socket.disconnect();
        socketRef.current = null;
      }
      setTimerActive(false);
    };
  }, [id, studentId, getExamInfo, start]);

  useEffect(() => {
    if (!timerActive) return;

    const updateRemaining = () => {
      const remaining = getRemainingSeconds(deadlineRef.current, clockOffsetRef.current);
      setTimeLeft(remaining);
      if (remaining === 0) {
        setTimerActive(false);
        if (!autoSubmitTriggeredRef.current) {
          autoSubmitTriggeredRef.current = true;
          void handleSubmitRef.current(true);
        }
      }
    };

    updateRemaining();
    const timer = setInterval(updateRemaining, 1000);
    return () => clearInterval(timer);
  }, [timerActive]);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));

    submissionRef.current = {
      ...submissionRef.current,
      answers: submissionRef.current.answers.map(answer =>
        answer.questionId === questionId
          ? { ...answer, chosenOptionId: optionId }
          : answer
      ),
    };
  };

  const handleMarkQuestion = (questionId: string) => {
    setMarked(prevMarked => ({
      ...prevMarked,
      [questionId]: !prevMarked[questionId],
    }));
  };

  if (!exam) {
    if (loadError) {
      return <p role="alert" className="p-6 text-red-600">{loadError}</p>;
    }
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
          {timerError && <p role="alert" className="mb-4 text-amber-700">{timerError}</p>}
          {submitError && <p role="alert" className="mb-4 text-red-600">{submitError}</p>}
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
                        disabled={timeLeft === 0 || isSubmitting}
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
                      disabled={timeLeft === 0 || isSubmitting}
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
            disabled={isSubmitting}
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