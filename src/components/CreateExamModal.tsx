"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { BookOpenIcon, XIcon } from "@/icons/icons";
import { useExamStore } from "@/stores/examStore";
import { ExamStatus } from "@/dto/exam.dto";
import DateTimePicker from "@/components/DateTimePicker";

interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

export default function CreateExamModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateExamModalProps) {
  const { user } = useAuthStore();
  const { createExam } = useExamStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createExam(
      title,
      description,
      startTime,
      parseInt(duration, 10),
      ExamStatus.DRAFT,
      user?.id,
    );
    if (response) {
      onSuccess?.("Exam created successfully!");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Exam
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
              <XIcon />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                required></textarea>
            </div>
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <DateTimePicker value={startTime} onChange={setStartTime} />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700">
                Duration (in minutes)
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:cursor-pointer">
                <BookOpenIcon />
                Create Exam
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
