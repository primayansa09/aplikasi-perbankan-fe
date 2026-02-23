
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  is_active: boolean;
  deleted_at?: string | null;
  created_at?: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
  message: string;
  status: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};
