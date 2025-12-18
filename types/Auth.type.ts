import type { User } from "./User.type";

export type UserAuthTypes = {
  email: string;
  password: string;
};

export type UserRegisterTypes = {
  name:string;
  email:string;
  password:string;
  avatarUrl:string;
}

export interface AuthResponse {
  user: User | null;
  token: string | null;
}
