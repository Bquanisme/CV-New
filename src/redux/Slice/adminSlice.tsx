"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerData, IAdminState, ICheckDeleteCustomer, ICreate, IEditCategory, IEditStatusOrders, IResponseEditManageTour, IResponseEditStaff, IResponseNewStaff, IUpdateStatus } from "@/typescript/home";
import { deleteCategoryAPI, deleteCustomerAPI, deleteRoomTourAPI, deleteStaffAPI, getCategoryAPI, getCustomerAPI, getRoomTourAPI, getStaffAPI, postCreateCategoryAPI, postCreateStaff, postEditCategoryAPI, postEditRoomTourAPI, postEditStaff, postRoomAPI, postTourAPI, postUpdateStatusAPI, postUpdateStatusOrderAPI } from "@/api/home/api.admin";

//customer
export const updateStatus = createAsyncThunk<
    CustomerData,
    { payload: IUpdateStatus; id: number },
    { rejectValue: string }
>("v2/customer/updateStatus", async ({ id, payload }, thunkAPI) => {
    try {
        const res = await postUpdateStatusAPI(id, payload);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Edit failed"
        );
    }
});

export const deleteCustomer = createAsyncThunk<
    ICheckDeleteCustomer,
    { ids: number[] }, //xóa nhiều
    { rejectValue: string }
>(
    "v2/customer/multiple-delete",
    async ({ ids }, thunkAPI) => {
        try {
            const res = await deleteCustomerAPI(ids);
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Delete failed"
            );
        }
    }
);

export const getCustomer = createAsyncThunk<
    { rejectValue: string }
>(
    "v2/customer/index",
    async (payload, thunkAPI) => {
        try {
            const res = await getCustomerAPI();
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "get Customer failed"
            );
        }
    }
);

//Staff
export const getStaff = createAsyncThunk<
    { rejectValue: string }
>(
    "v2/staff/index",
    async (payload, thunkAPI) => {
        try {
            const res = await getStaffAPI();
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "get Staff failed"
            );
        }
    }
);

export const deleteStaff = createAsyncThunk<
    ICheckDeleteCustomer,
    { ids: number[] }, //xóa nhiều
    { rejectValue: string }
>(
    "v2/staff/multiple-delete",
    async ({ ids }, thunkAPI) => {
        try {
            const res = await deleteStaffAPI(ids);
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Delete failed"
            );
        }
    }
);


export const editStaff = createAsyncThunk<
    IResponseEditStaff,
    { id: number, formData: FormData },
    { rejectValue: string }
>("v2/staff/update", async ({ id, formData }, thunkAPI) => {
    try {
        const res = await postEditStaff(id, formData);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Edit failed"
        );
    }
});

export const createStaff = createAsyncThunk<
    IResponseNewStaff,
    { formData: FormData },
    { rejectValue: string }
>("v2/staff/create", async ({ formData }, thunkAPI) => {
    try {
        const res = await postCreateStaff(formData);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Create failed"
        );
    }
});


///Category
export const editCategory = createAsyncThunk<
    IEditCategory,
    { id: number, data: IEditCategory },
    { rejectValue: string }
>("v2/category/update", async ({ id, data }, thunkAPI) => {
    try {
        const res = await postEditCategoryAPI(id, data);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Edit failed"
        );
    }
});

export const createCategory = createAsyncThunk<
    IEditCategory,
    { payload: IEditCategory },
    { rejectValue: string }
>("v2/category/create", async ({ payload }, thunkAPI) => {
    try {
        const res = await postCreateCategoryAPI(payload);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Create failed"
        );
    }
});

export const deleteCategory = createAsyncThunk<
    ICheckDeleteCustomer,
    { ids: number[] }, //xóa nhiều
    { rejectValue: string }
>(
    "v2/category/multiple-delete",
    async ({ ids }, thunkAPI) => {
        try {
            const res = await deleteCategoryAPI(ids);
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Delete failed"
            );
        }
    }
);

export const getCategory = createAsyncThunk<
    { rejectValue: string }
>(
    "v2/category/index",
    async (payload, thunkAPI) => {
        try {
            const res = await getCategoryAPI();
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "get Category failed"
            );
        }
    }
);


///Manage Tour
export const editManageTour = createAsyncThunk<
    IResponseEditManageTour,
    { id: number, formData: FormData },
    { rejectValue: string }
>("v2/staff/update", async ({ id, formData }, thunkAPI) => {
    try {
        const res = await postEditRoomTourAPI(id, formData);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Edit failed"
        );
    }
});

export const createTour = createAsyncThunk<
    ICreate,
    FormData,
    { rejectValue: string }
>("v2/room/create-tour", async (formData, thunkAPI) => {
    try {
        const res = await postTourAPI(formData);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Create failed"
        );
    }
});


export const createRoom = createAsyncThunk<
    ICreate,
    FormData,
    { rejectValue: string }
>("v2/room/create-room", async (formData, thunkAPI) => {
    try {
        const res = await postRoomAPI(formData);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Create failed"
        );
    }
});

export const deleteManageTour = createAsyncThunk<
    ICheckDeleteCustomer,
    { ids: number[] }, //xóa nhiều
    { rejectValue: string }
>(
    "v2/room/multiple-delete",
    async ({ ids }, thunkAPI) => {
        try {
            const res = await deleteRoomTourAPI(ids);
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Delete failed"
            );
        }
    }
);

export const getManageTour = createAsyncThunk<
    { rejectValue: string }
>(
    "v2/room/index",
    async (payload, thunkAPI) => {
        try {
            const res = await getRoomTourAPI();
            return res;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "get Manage Tour failed"
            );
        }
    }
);

export const editManageOrders = createAsyncThunk<
    IEditStatusOrders,
    { id: number, status: string },
    { rejectValue: string }
>("v2/order/update-status", async ({ id, status }, thunkAPI) => {
    try {
        const res = await postUpdateStatusOrderAPI(id, status);
        return res;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Edit failed"
        );
    }
});


const initialState: IAdminState = {
    customerData: [],
    statusUpdate: null,
    staffData: [],
    staffEdit: null,
    categoryEdit: null,
    categoryCreate: null,
    categoryData: [],
    manageTourEdit: null,
    manageTourData: [],
    status: "",
    error: null,
};

export const adminSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateStatus.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.statusUpdate = action.payload;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Edit failed";
            })



            .addCase(deleteCustomer.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;

                const deletedIds = action.payload.deletedIds || [];

                if (state.customerData) {
                    state.customerData = state.customerData.filter(
                        (item: any) => !deletedIds.includes(item.id)
                    );
                }
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Delete failed";
            })



            .addCase(deleteStaff.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;

                const deletedIds = action.payload.deletedIds || [];

                if (state.staffData) {
                    state.staffData = state.staffData.filter(
                        (item: any) => !deletedIds.includes(item.id)
                    );
                }
            })
            .addCase(deleteStaff.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Delete failed";
            })


            .addCase(editStaff.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(editStaff.fulfilled, (state, action) => {
                state.staffEdit = action.payload;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(editStaff.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Edit failed";
            })



            .addCase(editCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.categoryEdit = action.payload;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Edit failed";
            })


            .addCase(deleteCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;

                const deletedIds = action.payload.deletedIds || [];

                if (state.categoryData) {
                    state.categoryData = state.categoryData.filter(
                        (item: any) => !deletedIds.includes(item.id)
                    );
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Delete failed";
            })


            .addCase(deleteManageTour.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteManageTour.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;

                const deletedIds = action.payload.deletedIds || [];

                if (state.manageTourData) {
                    state.manageTourData = state.manageTourData.filter(
                        (item: any) => !deletedIds.includes(item.id)
                    );
                }
            })
            .addCase(deleteManageTour.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Delete failed";
            });
    },
});

export default adminSlice.reducer;
