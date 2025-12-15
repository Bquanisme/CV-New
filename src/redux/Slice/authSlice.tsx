"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAPI, loginAdminAPI, registerAPI, verifyAPI } from "@/api/home/api.auth";
import {
  IAuthState, ILoginPayload, IAuthResponse, IRegisterPayload, IVerifyResponse, IVerifyPayload, IAdminPayload, IAdminResponse
} from "@/typescript/home";

// Login user
export const login = createAsyncThunk<IAuthResponse, ILoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const data = await loginAPI(payload); // { user, token, role, isVerify }
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user-data", JSON.stringify(data.user));
        localStorage.setItem("role", data.role);
      }
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Login admin
export const admin = createAsyncThunk<IAdminResponse, IAdminPayload, { rejectValue: string }>(
  "auth/adminLogin",
  async (payload, thunkAPI) => {
    try {
      const data = await loginAdminAPI(payload); // { adminData, token, role }
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin-data", JSON.stringify(data));
        localStorage.setItem("role", data.role);
      }
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Admin login failed");
    }
  }
);

// Register
export const register = createAsyncThunk<IAuthResponse, IRegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const data = await registerAPI(payload); // { user, token, role }
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user-data", JSON.stringify(data.user));
        localStorage.setItem("role", data.role);
      }
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

// Verify
export const verify = createAsyncThunk<IVerifyResponse, IVerifyPayload, { rejectValue: string }>(
  "auth/verify",
  async ({ email, code }, thunkAPI) => {
    try {
      const data = await verifyAPI({ email, code });
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Verify failed");
    }
  }
);

const initialState: IAuthState = {
  token: null,
  role: null,
  user: null,
  admin: null,
  status: "",
  error: null,
  verify: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.admin = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user-data");
      localStorage.removeItem("admin-data");
    },
  },
  extraReducers: (builder) => {
    // --- Login user ---
    builder
      .addCase(login.pending, (state) => { state.status = "loading"; })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });

    // --- Login admin ---
    builder
      .addCase(admin.pending, (state) => { state.status = "loading"; })
      .addCase(admin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.admin = action.payload;
        state.status = "succeeded";
      })
      .addCase(admin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Admin login failed";
      });

    // --- Register ---
    builder
      .addCase(register.pending, (state) => { state.status = "loading"; })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Register failed";
      });

    // --- Verify ---
    builder
      .addCase(verify.pending, (state) => { state.status = "loading"; })
      .addCase(verify.fulfilled, (state, action) => {
        state.verify = action.payload;
        state.status = "succeeded";
      })
      .addCase(verify.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Verify failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
