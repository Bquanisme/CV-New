"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, verifyAPI } from "@/api/home/api.auth";
import { IAuthState, ILoginPayload, IAuthResponse, IRegisterPayload, IVerifyResponse, IVerifyPayload } from "@/typescript/home";

export const login = createAsyncThunk<
  IAuthResponse,
  ILoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, thunkAPI) => {
  try {
    const data = await loginAPI(payload); // data = { user, token, role, isVerify }

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user-data", JSON.stringify(data.user));
    }

    return data; // trả trực tiếp object "data"
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Login failed"
    );
  }
});

export const register = createAsyncThunk<
  IAuthResponse,
  IRegisterPayload,
  { rejectValue: string }
>("register", async (payload, thunkAPI) => {
  try {
    const data = await registerAPI(payload); 

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user-data", JSON.stringify(data.user));
    }

    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Login failed"
    );
  }
});

export const verify = createAsyncThunk<
  IVerifyResponse,
  IVerifyPayload,
  { rejectValue: string }
>("register/verify", async ({ email, code }, thunkAPI) => {
  try {
    const res = await verifyAPI({ email, code });
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'register failed');
  }
});


const initialState: IAuthState = {
  token: null,
  user: null,
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
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user-data");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        state.status = "succeeded";
      })

      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        state.status = "succeeded";
      })

      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Register failed";
      })

      .addCase(verify.pending, (state) => {
        state.status = "loading";
      })
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
