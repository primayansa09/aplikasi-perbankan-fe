import apiClient from "../config/api-client";
import {
  DataResponseTransaction,
  DataResponseTransactionId
} from "../store/store/type";
import { transactionAPI } from "../constants/transactionAPI";

export const createTransaction = (formData: any): Promise<DataResponseTransaction> => {
  return apiClient
    .post<DataResponseTransaction>(`${transactionAPI.transaction}`, formData) 
    .then((response) => {
      const responseData = response.data;
      return responseData;
    });
};

export const getDataTransactionById = (id: string): Promise<DataResponseTransactionId> => {
  return apiClient
    .get<DataResponseTransactionId>(`${transactionAPI.getTransaction}/${id}`)
    .then((response) => response.data);
};