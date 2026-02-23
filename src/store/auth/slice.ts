import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, LoginPayload, LoginResponse } from "../../api/AuthApi";
import apiClient from "../../config/api-client";
import { loginAPI } from "../../constants/loginApi";

interface AuthState {
  token: string | null;
  user: LoginResponse["data"]["user"] | null;
  loading: boolean;
  error: string | null;
}

const storedUser = localStorage.getItem("userData");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  token: parsedUser?.token || null,
  user: parsedUser || null,
  loading: false,
  error: null,
};

// thunk untuk login
export const login = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await apiClient.post(loginAPI.login, {
        email,
        password,
      });
      return response.data; // { data: { token, user }, message, status }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Login gagal, periksa kembali email atau password.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;

        console.log("LOGIN RESPONSE:", action.payload.data.user);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: action.payload.data.token,
            ...action.payload.data.user,
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Login gagal, terjadi kesalahan server.";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
