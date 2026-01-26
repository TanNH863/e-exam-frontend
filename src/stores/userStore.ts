import { UserResponse, UserRole } from "@/dto/user.dto";
import { create } from "zustand";

interface InitialState {
  user: UserResponse | null;
  users: UserResponse[];
  error: string | null;
  isLoading: boolean;
  createUser: (
    email: string,
    password: string,
    full_name: string,
    role: UserRole
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
  createUser: async (email, password, full_name, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            full_name,
            role
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const newUser = await response.json();
      await get().getAllUsers();
      return newUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
    }
  },
  getAllUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }
      const userList = await response.json();
      set({ users: userList, isLoading: false });
      return userList;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      return [];
    }
  },
  getUserInfo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user");
      }
      const userList = await response.json();
      set({ users: userList, isLoading: false });
      return userList;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      return [];
    }
  },
  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
    }
  },
}));
