import { AuthResponse } from "@/dto/user.dto";
import { create } from "zustand";
import { apiFetch } from "@/utils/fetcher";

interface AuthState {
  user: AuthResponse | null;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json(); 
      set({ user: data.user, isLoading: false });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await apiFetch("/logout", { method: "POST" });
      set({ user: null, isLoading: false });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await apiFetch("/profile");

      if (!response.ok) throw new Error("Not authenticated");

      const data = await response.json();
      const user = {
        id: data.sub,
        email: data.email,
        role: data.role,
      };
      set({ user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
