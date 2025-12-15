"use client";
import { CustomerData, ICheckDeleteCustomer, ICreate, IEditCategory, IEditStatusOrders, IResponseEditManageTour, IResponseEditStaff, IResponseNewStaff, IUpdateStatus } from "@/typescript/home";
import axiosClient from "../axiosClient";

//Admin
////Dashboard
export const getDashboardAPI = async () => {
  const res = await axiosClient.get('/v2/dashboard/general')
  return res.data;
}

////Customer
export const getCustomerAPI = async () => {
  const res = await axiosClient.get('/v2/customer/index')
  return res.data.data;
}

export const postUpdateStatusAPI = async (
  id: number,
  payload: IUpdateStatus
): Promise<CustomerData> => {
  const res = await axiosClient.post(`/v2/customer/updateStatus/${id}`, payload);
  return res.data;
};

export const deleteCustomerAPI = async (ids: number[]): Promise<ICheckDeleteCustomer> => {
  const res = await axiosClient.delete(`/v2/customer/multiple-delete`, {
    data: { ids }
  });
  return res.data;
};


// ////Staff
export const getStaffAPI = async () => {
  const res = await axiosClient.get('/v2/staff/index')
  return res.data.data
}

export const postCreateStaff = async (
  formData: FormData,
): Promise<IResponseNewStaff> => {
  const res = await axiosClient.post(`/v2/staff/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getDetailStaffAPI = async (id: number) => {
  const res = await axiosClient.get(`/v2/staff/show/${id}`)
  return res.data
}

export const postEditStaff = async (
  id: number,
  formData: FormData,
): Promise<IResponseEditStaff> => {
  const res = await axiosClient.post(`/v2/staff/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteStaffAPI = async (ids: number[]): Promise<ICheckDeleteCustomer> => {
  const res = await axiosClient.delete(`/v2/staff/multiple-delete`, { data: { ids } });
  return res.data
}

// ////Category
export const getCategoryAPI = async () => {
  const res = await axiosClient.get('/v2/category/index')
  return res.data.data
}

export const postCreateCategoryAPI = async (payload: IEditCategory): Promise<IEditCategory> => {
  const res = await axiosClient.post(`/v2/category/create`, payload);
  return res.data
}

export const getDetailCategoryAPI = async (id: number) => {
  const res = await axiosClient.get(`/v2/category/show/${id}`)
  return res.data
}

export const postEditCategoryAPI = async (id: number, data: IEditCategory): Promise<IEditCategory> => {
  const res = await axiosClient.post(`/v2/category/update/${id}`, data);
  return res.data
}

export const deleteCategoryAPI = async (ids: number[]): Promise<ICheckDeleteCustomer> => {
  const res = await axiosClient.delete(`/v2/category/multiple-delete`, { data: { ids } });
  return res.data
}

// ////Manage Tour
export const getRoomTourAPI = async () => {
  const res = await axiosClient.get(`/v2/room/index`)
  return res.data.data
}

export const postRoomAPI = async (formData: FormData): Promise<ICreate> => {
  const res = await axiosClient.post(`/v2/room/create-room`, formData);
  return res.data
}

export const postTourAPI = async (formData: FormData): Promise<ICreate> => {
  const res = await axiosClient.post(`/v2/room/create-tour`, formData);
  return res.data
}

export const getDetailRoomTourAPI = async (id: number) => {
  const res = await axiosClient.get(`/v2/room/show/${id}`)
  return res.data
}

export const postEditRoomTourAPI = async (
  id: number,
  formData: FormData,
): Promise<IResponseEditManageTour> => {
  const res = await axiosClient.post(`/v2/room/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteRoomTourAPI = async (ids: number[]): Promise<ICheckDeleteCustomer> => {
  const res = await axiosClient.delete(`/v2/room/multiple-delete`, { data: { ids } });
  return res.data
}


////Cancel Request
export const getCancelAPI = async () => {
  const res = await axiosClient.get(`/v2/request-cancel/index`)
  return res.data.data;
}

// export const getDetailCancelAPI = (id) => {
//   return axiosClient.get(`/v2/request-cancel/show/${id}`)
// }

// export const postUpdateStatusCancelAPI = (id, data) => {
//   return axiosClient.post(`/v2/request-cancel/update-status/${id}`, data);
// }

// ////Manage Orders
export const getOrderAPI = async () => {
  const res = await axiosClient.get(`/v2/order/index`)
  return res.data.data
}

// export const getDetailOrderAPI = (id) => {
//   return axiosClient.get(`/v2/order/show/${id}`)
// }

export const postUpdateStatusOrderAPI = async (id: number, status: string): Promise<IEditStatusOrders> => {
  const res = await axiosClient.post(`/v2/order/update-status/${id}`, {status});
  return res.data
}