export enum UserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export interface CreateUserDto {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: Date;
}

export interface AuthResponse {
  id: string;
  email: string;
  role: UserRole;
}
