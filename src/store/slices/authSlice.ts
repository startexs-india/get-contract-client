import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string;
  role: string;
  name: string;
  email: string;
  companyIds?: string[];  // array of company IDs
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  otpId: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  otpId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    setOtpId: (state, action: PayloadAction<string>) => {
      state.otpId = action.payload;
    },

    addCompanyId: (state, action: PayloadAction<string>) => {
      if (state.user) {
        if (!state.user.companyIds) {
          state.user.companyIds = [];
        }

        if (!state.user.companyIds.includes(action.payload)) {
          state.user.companyIds.push(action.payload);
        }
      }
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.otpId = null;
    },
  },
});

export const { setCredentials, setOtpId, addCompanyId, logout } = authSlice.actions;
export default authSlice.reducer;