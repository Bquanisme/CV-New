"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./Slice/authSlice";

// Gộp reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Tạo store chuẩn Redux Toolkit v2+
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // cần tắt khi dùng redux-persist
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Tạo persistor
export const persistor = persistStore(store);

// Kiểu dữ liệu TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
