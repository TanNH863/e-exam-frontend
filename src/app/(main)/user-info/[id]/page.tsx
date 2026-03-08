"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { UserResponse } from "@/dto/user.dto";
import Spinner from "@/components/Spinner";

export default function UserInfo() {
  const { id } = useParams();
  const { getUserInfo, isLoading, error } = useUserStore();
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getUserInfo(id as string);
          setUser(fetchedUser);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchUser();
    }
  }, [id, getUserInfo]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <main className="py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          User Information
        </h1>
        <div className="mt-8">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                User Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application role.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user.full_name}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user.email}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                          : "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20"
                      }`}
                    >
                      {user.role}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}