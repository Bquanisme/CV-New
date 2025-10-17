"use client";
import { ILoginPayload, IAuthResponse, IRegisterPayload, IVerifyPayload, IVerifyResponse } from "@/typescript/home";
import axiosClient from "../axiosClient";

export const loginAPI = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const res = await axiosClient.post("/auth/login", payload);
  // console.log("API response:", res.data);
  return res.data; 
};

export const registerAPI = async (payload: IRegisterPayload): Promise<IAuthResponse> => {
  const res = await axiosClient.post("/register", payload);
  console.log("API response:", res.data);
  return res.data; 
};

export const verifyAPI = async ({email, code}: IVerifyPayload): Promise<IVerifyResponse> => {
  return axiosClient.post("/register/verify-code", {email, code});
};

