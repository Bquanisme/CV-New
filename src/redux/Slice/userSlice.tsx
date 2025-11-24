"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResponseOrderTour, IOrderTour, IUserState, IOrderRoom, IResponseCommentReview, IResponseEditUser, IChangePassword, ICheckOrder } from "@/typescript/home";
import { checkDeleteOrderAPI, editPasswordAPI, editUserAPI, orderRoomAPI, orderTourAPI, reviewCommentAPI } from "@/api/home/api.home";

// đặt tour
export const orderTour = createAsyncThunk<
  IResponseOrderTour,
  IOrderTour,
  { rejectValue: string }
>("order/booking-tour", async (payload, thunkAPI) => {
  try {
    const res = await orderTourAPI(payload);
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Order failed"
    );
  }
});

export const orderRoom = createAsyncThunk<
  IResponseOrderTour,
  IOrderRoom,
  { rejectValue: string }
>("order/booking-room", async (payload, thunkAPI) => {
  try {
    const res = await orderRoomAPI(payload);
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Order failed"
    );
  }
});

export const reviewComment = createAsyncThunk<
  IResponseCommentReview,
  FormData,
  { rejectValue: string }
>("review/create", async (formData, thunkAPI) => {
  try {
    const res = await reviewCommentAPI(formData);
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Review failed"
    );
  }
});

export const editUser = createAsyncThunk<
  IResponseEditUser,
  { formData: FormData; id: number },
  { rejectValue: string }
>("user/update", async ({ formData, id }, thunkAPI) => {
  try {
    const res = await editUserAPI(formData, id);
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Edit failed"
    );
  }
});

export const editPassword = createAsyncThunk<
  IChangePassword,
  { id: number; payload: IChangePassword },
  { rejectValue: string }
>(
  "user/updatePs",
  async ({ id, payload }, thunkAPI) => {
    try {
      const res = await editPasswordAPI(id, payload);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Edit password failed"
      );
    }
  }
);

export const checkDeleteOrder = createAsyncThunk<
  ICheckOrder,
  { id: string },
  { rejectValue: string }
>(
  "order/cancel",
  async ({ id }, thunkAPI) => {
    try {
      const res = await checkDeleteOrderAPI(id);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Check Delete failed"
      );
    }
  }
);



const initialState: IUserState = {
  commentReview: null,
  tourOrder: null,
  roomOrder: null,
  userEdit: null,
  status: "",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reviewComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(reviewComment.fulfilled, (state, action) => {
        state.commentReview = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(reviewComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Order failed";
      })


      .addCase(editUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.userEdit = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Order failed";
      })


      .addCase(orderTour.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(orderTour.fulfilled, (state, action) => {
        state.tourOrder = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(orderTour.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Order failed";
      })


      .addCase(orderRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(orderRoom.fulfilled, (state, action) => {
        state.roomOrder = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(orderRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Order failed";
      });
  },
});

export default userSlice.reducer;
