"use client";

import { BellIcon, BookOpenIcon, LogoutIcon } from "@/icons/icons";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
  isActive: boolean;
}

interface TopNavigationBarProps {
  navLinks: NavLink[];
}

export default function TopNavigationBar({ navLinks }: TopNavigationBarProps) {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center font-bold text-2xl text-blue-600">
              <BookOpenIcon />
              <span>ExamPlatform</span>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    link.isActive
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
