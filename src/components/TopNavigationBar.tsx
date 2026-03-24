"use client";

import { BellIcon, BookOpenIcon, LogoutIcon, UserIcon } from "@/icons/icons";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifications, profileItems } from "../../mock.data";

interface NavLink {
  href: string;
  label: string;
  isActive: boolean;
}

interface TopNavigationBarProps {
  navLinks: NavLink[];
}

export default function TopNavigationBar({ navLinks }: TopNavigationBarProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [hasNotification, setHasNotification] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const handleNotificationClick = () => {
    setHasNotification(false);
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };
  
  const handleProfileClick = () => {
    setShowNotifications(false);
    setShowProfile(!showProfile);
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
            <div className="relative">
              <button
                type="button"
                className={`relative mr-4 rounded-full p-1 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  showNotifications
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white text-gray-400 hover:text-gray-500"
                }`}
                onClick={handleNotificationClick}
              >
                <span className="sr-only">View notifications</span>
                <BellIcon />
                {hasNotification && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 font-bold">Notifications</div>
                    <div className="border-t border-gray-100"></div>
                    {notifications.map((notification) => (
                      <a href="#" key={notification.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {notification.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                className={`relative mr-4 rounded-full p-1 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  showProfile
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white text-gray-400 hover:text-gray-500"
                }`}
                onClick={handleProfileClick}
              >
                <span className="sr-only">View options</span>
                <UserIcon className="h-6 w-6"/>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 font-bold">Profile</div>
                    <div className="border-t border-gray-100"></div>
                    {profileItems.map((item) => (
                      <Link href={`/user-info/${user?.id}`} key={item.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm hover:cursor-pointer font-medium text-gray-700 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
