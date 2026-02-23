import apiClient from "../config/api-client";
import {
  DataResponseCreate,
  DataResponseAccount
} from "../store/store/type";
import { accountAPI } from "../constants/accountAPI";

export const createAccount = (formData: any): Promise<DataResponseCreate> => {
  return apiClient
    .post<DataResponseCreate>(`${accountAPI.addAccount}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const responseData = response.data;
      return responseData;
    });
};

export const getDataAccountById = (id: string): Promise<DataResponseAccount> => {
  return apiClient
    .get<DataResponseAccount>(`${accountAPI.getAccount}/${id}`)
    .then((response) => response.data);
};