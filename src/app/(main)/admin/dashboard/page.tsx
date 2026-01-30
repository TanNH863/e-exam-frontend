"use client";

import { useState, useEffect } from "react";
import { UserResponse } from "@/dto/user.dto";
import { useUserStore } from "@/stores/userStore";
import Table, { TableColumn } from "@/components/Table";

const userColumns: TableColumn<UserResponse>[] = [
  {
    key: "full_name",
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
  const { getAllUsers } = useUserStore();
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
      console.log("Fetched users:", users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <main className="py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
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
