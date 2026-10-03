'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSubmissionStore } from '@/stores/submissionStore';
import { useExamStore } from '@/stores/examStore';
import { SubmissionResponse } from '@/dto/submission.dto';
import { ExamInfo } from '@/dto/exam.dto';
import Spinner from '@/components/Spinner';
import MessageModal from '@/components/MessageModal';

export default function ExamResultPage() {
  const { id } = useParams();
  const router = useRouter();
  const { submissions } = useSubmissionStore();
  const { getExamInfo } = useExamStore();
  
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
  const [exam, setExam] = useState<ExamInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const examId = Array.isArray(id) ? id[0] : id;
        
        if (!examId) {
          setShowError(true);
          return;
        }

        // Get the latest submission for this exam
        const latestSubmission = submissions
          .filter((sub) => sub.examId === examId)
          .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())[0];

        if (!latestSubmission) {
          setShowError(true);
          return;
        }

        // Fetch exam details
        const examData = await getExamInfo(examId);
        
        setSubmission(latestSubmission);
        setExam(examData);
      } catch (error) {
        console.error('Error loading exam result:', error);
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, submissions, getExamInfo]);

  const handleBackToDashboard = () => {
    router.push('/student/dashboard');
  };

  const handleErrorClose = () => {
    router.push('/student/dashboard');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (showError || !submission || !exam) {
    return (
      <MessageModal
        isOpen={true}
        onClose={handleErrorClose}
        onOk={handleErrorClose}
        title="Error"
        message="Failed to load exam results. Please try again."
      />
    );
  }

  const scorePercentage = exam.examQuestions.length > 0 
    ? Math.round((submission.score / exam.examQuestions.length) * 100) 
    : 0;

  const isPassed = scorePercentage >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Result Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className={`p-8 text-center ${isPassed ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
            <h1 className="text-4xl font-bold text-white mb-2">
              {isPassed ? '✓ Congratulations!' : '✗ Try Again'}
            </h1>
            <p className="text-green-100 text-lg">
              {isPassed ? 'You have successfully passed the exam!' : 'Unfortunately, you did not pass this exam.'}
            </p>
          </div>

          {/* Score Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                  {exam.title}
                </h2>
                <p className="text-gray-500 text-sm">{exam.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{submission.score}</div>
                <div className="text-xs text-gray-600 mt-1">Correct Answers</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{exam.examQuestions.length}</div>
                <div className="text-xs text-gray-600 mt-1">Total Questions</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                  {scorePercentage}%
                </div>
                <div className="text-xs text-gray-600 mt-1">Score</div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Exam Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Submission ID</span>
                <span className="text-gray-900 font-medium text-sm">{submission.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  submission.status === 1 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {submission.status === 1 ? 'Submitted' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Duration</span>
                <span className="text-gray-900 font-medium">{exam.duration} minutes</span>
              </div>
            </div>
          </div>

          {/* Performance Feedback */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Feedback</h3>
            <div className="space-y-3 text-gray-700">
              {isPassed ? (
                <>
                  <p className="flex items-start">
                    <span className="text-green-500 mr-3 font-bold">✓</span>
                    <span>Excellent performance! You have demonstrated a solid understanding of the material.</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-green-500 mr-3 font-bold">✓</span>
                    <span>Keep practicing to improve your scores even further.</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">✗</span>
                    <span>You need to score at least 60% to pass this exam.</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">✗</span>
                    <span>Review the material and try again to improve your performance.</span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="p-8 border-t border-gray-200 flex gap-4">
            <button
              onClick={handleBackToDashboard}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => router.push('/student/dashboard')}
              className="flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              View All Exams
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 text-center text-gray-600">
          <p className="text-sm">
            Questions about your results? Contact your instructor for more detailed feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
