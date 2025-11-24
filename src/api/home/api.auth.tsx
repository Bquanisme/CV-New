"use client";
import { ILoginPayload, IAuthResponse, IRegisterPayload, IVerifyPayload, IVerifyResponse, IAdminPayload, IAdminResponse } from "@/typescript/home";
import axiosClient from "../axiosClient";

export const loginAPI = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const res = await axiosClient.post("/auth/login", payload);
  return res.data;
};

export const loginAdminAPI = async (payload: IAdminPayload): Promise<IAdminResponse> => {
  const res = await axiosClient.post('/v2/auth/login', payload);
  return res.data;
}


export const registerAPI = async (payload: IRegisterPayload): Promise<IAuthResponse> => {
  const res = await axiosClient.post("/register", payload);
  console.log("API response:", res.data);
  return res.data;
};

export const verifyAPI = async ({ email, code }: IVerifyPayload): Promise<IVerifyResponse> => {
  return axiosClient.post("/register/verify-code", { email, code });
};

