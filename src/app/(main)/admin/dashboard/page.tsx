"use client";

import { useState, useEffect } from "react";
import { UserResponse } from "@/dto/user.dto";
import { useUserStore } from "@/stores/userStore";
import Table, { TableColumn } from "@/components/Table";
import Toast from "@/components/Toast";
import CreateQuestionModal from "@/components/CreateQuestionModal";
import { PlusCircleIcon, UploadIcon } from "@/icons/icons";

const userColumns: TableColumn<UserResponse>[] = [
  {
    key: "fullName",
    label: "Name",
    searchable: true,
  },
  {
    key: "email",
    label: "Email",
    searchable: true,
  },
  {
    key: "role",
    label: "Role",
    render: (value) => (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === "ADMIN"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800"
        }`}>
        {String(value)}
      </span>
    ),
  },
];

export default function AdminDashboard() {
  const { users, getAllUsers, uploadFile } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleFileUpload = async (file: File) => {
    if (!file) {
      setToastType("error");
      setToastMessage("No file selected!");
      return;
    }

    try {
      const response = await uploadFile(file);
      if (response && response.message) {
        setToastType("success");
        setToastMessage(response.message);
        getAllUsers();
      } else {
        throw new Error("Failed to upload file.");
      }
    } catch (error: any) {
      setToastType("error");
      setToastMessage(error.message || "An unknown error occurred.");
    }
  };

  const resetFileInput = () => {
    const fileInput = document.getElementById(
      "file-upload",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <>
      <CreateQuestionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(msg) => setToastMessage(msg)}
      />
      {toastMessage && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(true)}
                className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
                <PlusCircleIcon />
                Create New User
              </button>
              <label
                htmlFor="file-upload"
                className="mt-4 flex items-center justify-center rounded-lg bg-[#1D6F42] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-green-800 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mt-0">
                <UploadIcon />
                Upload from Excel
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    handleFileUpload(selectedFile);
                    resetFileInput();
                  }
                }}
              />
            </div>
          </div>

          <section className="mt-8">
            <Table
              data={users}
              columns={userColumns}
              title="All Users"
              searchPlaceholder="Search users..."
            />
          </section>
        </div>
      </main>
    </>
  );
}
