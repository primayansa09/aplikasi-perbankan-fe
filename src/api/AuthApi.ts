import apiClient from "../config/api-client";
import { loginAPI } from "../constants/loginApi";

export interface LoginPayload {
  FullName: string;
  Password: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      account: string;
      accountId: string;
      amount: number;
      isDeleted: boolean;
    };
  };
  message: string;
  status: number;
}

//untuk login
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(loginAPI.login, payload);
  return response.data;
};
