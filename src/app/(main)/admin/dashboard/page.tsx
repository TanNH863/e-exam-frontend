"use client";

import { useState, useEffect } from "react";
import { UserResponse } from "@/dto/user.dto";
import { SearchIcon } from "@/icons/icons";
import { useUserStore } from "@/stores/userStore";

export default function AdminDashboard() {
  const { getAllUsers } = useUserStore();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  All Users
                </h2>
                <div className="w-1/3 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="p-2 pl-10 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-lg border border-gray-200 p-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-gray-600">{user.full_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
