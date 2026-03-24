import { UserResponse, UserRole } from "@/dto/user.dto";
import { create } from "zustand";
import { apiFetch } from "@/utils/fetcher";

interface InitialState {
  user: UserResponse | null;
  users: UserResponse[];
  error: string | null;
  isLoading: boolean;
  createUser: (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
  ) => Promise<{ message: string; user: UserResponse } | undefined>;
  getAllUsers: () => Promise<UserResponse[]>;
  getUserInfo: (id: string) => Promise<UserResponse>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<InitialState>((set, get) => ({
  user: null,
  users: [],
  error: null,
  isLoading: false,
  createUser: async (email, password, fullName, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch("/user", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          fullName,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const newUser = await response.json();
      await get().getAllUsers();
      return newUser;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
      throw error;
    }
  },
  getAllUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch("/users");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }
      const userList = await response.json();
      set({ users: userList, isLoading: false });
      return userList;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
      return [];
    }
  },
  getUserInfo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch(`/user/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user");
      }
      const userList = await response.json();
      set({ users: userList, isLoading: false });
      return userList;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
      throw error;
    }
  },
  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch(`/user/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: msg, isLoading: false });
    }
  },
}))