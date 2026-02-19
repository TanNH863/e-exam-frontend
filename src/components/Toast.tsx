"use client";

import { ErrorIcon, SuccessIcon, XIcon } from "@/icons/icons";
import { useEffect, useState } from "react";

interface ToastProps {
  type: string;
  message: string;
  onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center gap-4 rounded-lg bg-gray-800 p-4 text-white shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}>
      {type === 'error' ? <ErrorIcon /> : <SuccessIcon /> }
      <span>{message}</span>
      <button onClick={handleClose} className="text-gray-400 hover:text-white">
        <XIcon />
      </button>
    </div>
  );
}
