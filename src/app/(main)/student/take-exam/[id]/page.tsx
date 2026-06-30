'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ExamInfo } from '@/dto/exam.dto';
import { DUMMY_EXAM } from '../../../../../../mock.data';
import Spinner from '@/components/Spinner';

export default function TakeExamPage() {
  const { id } = useParams();
  const [exam, setExam] = useState<ExamInfo | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const examData: ExamInfo = DUMMY_EXAM as unknown as ExamInfo;
    setExam(examData);
    setTimeLeft(examData.duration * 60);
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    // Mock submitting answers
    console.log('Submitting answers:', answers);
    alert('Exam submitted successfully!');
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">{exam.title}</h1>
      <p className="mb-4 text-black">{exam.description}</p>
      <div className="text-red-500 font-bold mb-4">
        Time Left: {formatTime(timeLeft)}
      </div>
      <div>
        {exam.examQuestions.map((question, index) => (
          <div key={question.id} className="mb-6 p-4 bg-white border rounded-lg">
            <h2 className="text-lg text-black font-semibold">{`${index + 1}. ${question.questionText}`}</h2>
            <div className="mt-2">
              {question.options?.map((option, i) => (
                <div key={i} className="flex items-center mb-2 text-black">
                  <input
                    type="radio"
                    name={question.id}
                    id={`${question.id}-${i}`}
                    value={option.optionText}
                    onChange={() => handleAnswerChange(question.id, option.optionText)}
                    className="mr-2"
                  />
                  <label htmlFor={`${question.id}-${i}`}>
                    {String.fromCharCode(65 + i)}. {option.optionText}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer"
      >
        Submit Exam
      </button>
    </div>
  );
};
