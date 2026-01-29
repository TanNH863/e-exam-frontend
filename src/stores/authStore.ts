import { AuthResponse, UserRole } from "@/dto/user.dto";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthResponse | null;
  error: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { token } = await response.json();

      const decodedToken: DecodedToken = jwtDecode(token);

      const user: AuthResponse = {
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
      };

      set({ user, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      set({ user: null, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
    }
  },
}));
