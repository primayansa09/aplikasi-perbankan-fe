import { Login } from "../pages/login/login";
import { Route } from "../types/route";
import { Transfer } from "../pages/transfer";
import { AddAccount } from "../pages/account";
import { GetDataAccount } from "../pages/account/getAccount";
import { GetTransaction } from "../pages/transaction/getTransaction";

export const protectedRoutes: Route[] = [
  {
    key: "login",
    title: "Login",
    description: "Login",
    component: Login,
    path: "/login",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "transfer",
    title: "Transfer",
    description: "Transfer",
    component: Transfer,
    path: "/transfer",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "add account",
    title: "Add Account",
    description: "Add Account",
    component: AddAccount,
    path: "/add-account",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "data rekening",
    title: "Data Rekening",
    description: "Data Rekening",
    component: GetDataAccount,
    path: "/data-rekening",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "transaksi",
    title: "Transaksi",
    description: "Transaksi",
    component: GetTransaction,
    path: "/transaksi",
    isEnabled: true,
    appendDivider: true,
  },
];
