"use client";

import { Suspense } from "react";
import AuthProvider from "@/components/AuthProvider";
import TopNavigationBar from "@/components/TopNavigationBar";
import { usePathname } from "next/navigation";

function MainNavigation() {
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
    } else if (pathname.startsWith("/admin")) {
      return [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          isActive: pathname === "/admin/dashboard",
        },
      ];
    }
    return [];
  };

  return <TopNavigationBar navLinks={getNavLinks()} />;
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<TopNavigationBar navLinks={[]} />}>
        <MainNavigation />
      </Suspense>
      <AuthProvider>
        <main className="py-10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </AuthProvider>
    </div>
  );
}
