export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};

export type Account = {
  account: string;
  amount: number;
};

export type Data = {
  id: string;
  fullName: string;
  email: string;
  accounts: Account[];
};

export type DataTransaction = {
  sourceAccount: string;
  destinationAccount: string;
  amount: string;
  createdAt: string;
  description: string;
};

export type DataAccountById = {
  id: string;
  fullName: string;
  email: string;
  account: string;
  amount: number;
  userId: string;
  createdAt: string;
  isDeleted: boolean
};

export type DataTransactionById = {
  id: string;
  accountId: string;
  account: string;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  balanceBefore: string;
  balanceAfter: string;
  description: string;
  transactionStatus: string;
  transactionType: number;
  createdAt: string;
  deletedAt: string;
  isDeleted: boolean;
};

export type DataResponse = ApiResponse<Data[]>;

export type DataResponseCreate = ApiResponse<Data>;

export type DataResponseTransaction = ApiResponse<DataTransaction>;

export type DataResponseAccount = ApiResponse<DataAccountById>;

export type DataResponseTransactionId = ApiResponse<DataTransactionById[]>

export type DataResponseById = ApiResponse<Data>;

export type DataInsertPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type DataTransactionPayload = {
  sourceAccount: string;
  destinationAccount: string;
  amount: string;
  description: string;
};
