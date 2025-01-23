import { api } from "./api";
import { UserType } from "@/models/user";

type LoginParams = { login: string; password: string };

type LoginResponse = {
  user: UserType;
  token: string;
};

type UserResponse = {
  user: UserType;
};

export async function Login(params: LoginParams) {
  const smt = await api.post<LoginResponse>("/login", params);
  const responseData: LoginResponse = smt.data;
  return responseData;
}

export async function getUser() {
  const reponseData = await api.get<UserResponse>("/user");
  return reponseData.data.user;
}
