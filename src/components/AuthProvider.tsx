"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import Spinner from "./Spinner";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="flex h-screen items-center justify-center"><Spinner/></div>;
  }

  return <>{children}</>;
}