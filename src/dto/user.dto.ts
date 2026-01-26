export enum UserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export interface CreateUserDto {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: UserRole;
  created_at: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: Date;
}

export interface AuthResponse {
  id: string;
  email: string;
  role: UserRole;
}
