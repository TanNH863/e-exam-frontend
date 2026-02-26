import { ExamStatus } from "@/dto/exam.dto";
import { XIcon } from "@/icons/icons";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk?: (submitType: ExamStatus) => Promise<void>;
  submitType?: ExamStatus | null;
}

export default function MessageModal({
  isOpen,
  onClose,
  onOk,
  submitType
}: MessageModalProps) {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Confirmation
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
              <XIcon />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <p className="text-gray-900">
            {submitType === ExamStatus.DRAFT
              ? "Are you sure you want to save the exam as draft?"
              : "Are you sure you want to publish the exam?"}
            </p>
          </div>

          <div className="flex justify-end space-x-3 py-4">
            <button onClick={onClose} className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 shadow-md transition-all hover:bg-gray-400 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-200">
              Cancel
            </button>
            <button
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={async () => {
                if (onOk && submitType) {
                  await onOk(submitType);
                }
                onClose();
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  )
}