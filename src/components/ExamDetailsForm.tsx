import { useState, useEffect } from "react";
import { ExamInfo } from "@/dto/exam.dto";
import { BookOpenIcon, ClockIcon } from "@/icons/icons";
import { getTimeDisplay } from "@/utils/date";

interface Props {
  exam: ExamInfo | undefined;
  onSave?: (data: {
    title?: string;
    description?: string;
    startTime?: Date;
    duration?: number;
  }) => Promise<void>;
}

export default function ExamDetailsForm({ exam, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (exam) {
      setTitle(exam.title || "");
      setDescription(exam.description || "");
      setStartTime(
        exam.startTime ? new Date(exam.startTime).toISOString().slice(0, 16) : ""
      );
      setDuration(exam.duration !== undefined ? String(exam.duration) : "");
    } else {
      setTitle("");
      setDescription("");
      setStartTime("");
      setDuration("");
    }
  }, [exam]);

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      const payload = {
        title: title || undefined,
        description: description || undefined,
        startTime: startTime ? new Date(startTime) : undefined,
        duration: duration ? Number(duration) : undefined,
      };
      await onSave(payload);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mt-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Exam Details</h2>

        {exam ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-black">
                Exam Title
              </label>
              <div className="mt-2">
                <div className="flex items-center">
                  <BookOpenIcon />
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="ml-2 w-full rounded border px-2 py-1"
                    placeholder="Exam title"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Start time
              </label>
              <div className="mt-2 flex items-center">
                <ClockIcon />
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="ml-2 rounded border px-2 py-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Duration (in minutes)
              </label>
              <div className="mt-2 flex items-center">
                <ClockIcon />
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="ml-2 w-24 rounded border px-2 py-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Description
              </label>
              <div className="mt-2 flex items-center">
                <BookOpenIcon />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="ml-2 w-full rounded border px-2 py-1"
                  rows={3}
                  placeholder="Description"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-2 flex space-x-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  if (exam) {
                    setTitle(exam.title || "");
                    setDescription(exam.description || "");
                    setStartTime(
                      exam.startTime ? new Date(exam.startTime).toISOString().slice(0, 16) : ""
                    );
                    setDuration(exam.duration !== undefined ? String(exam.duration) : "");
                  }
                }}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
              >
                Reset
              </button>
              <div className="ml-auto self-center text-sm text-gray-500">
                Current display: {exam.startTime ? getTimeDisplay(new Date(exam.startTime)) : "N/A"}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <p>No data was found</p>
          </div>
        )}
      </div>
    </section>
  );
}
