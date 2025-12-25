"use client";

import TopNavigationBar from "@/components/TopNavigationBar";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getNavLinks = () => {
    if (pathname.startsWith("/teacher")) {
      return [
        {
          href: "/teacher/dashboard",
          label: "Dashboard",
          isActive: pathname === "/teacher/dashboard",
        },
        {
          href: "/teacher/manage",
          label: "Manage Exams",
          isActive: pathname === "/teacher/manage",
        },
        {
          href: "/teacher/question-bank",
          label: "Question Bank",
          isActive: pathname === "/teacher/question-bank",
        },
        {
          href: "/teacher/grading",
          label: "Grading",
          isActive: pathname === "/teacher/grading",
        },
      ];
    } else if (pathname.startsWith("/student")) {
      return [
        {
          href: "/student/dashboard",
          label: "Dashboard",
          isActive: pathname === "/student/dashboard",
        },
        {
          href: "/student/exams",
          label: "My Exams",
          isActive: pathname === "/student/exams",
        },
        {
          href: "/student/results",
          label: "Results",
          isActive: pathname === "/student/results",
        },
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavigationBar navLinks={getNavLinks()} />
      {children}
    </div>
  );
}
