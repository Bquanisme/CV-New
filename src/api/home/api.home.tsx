import { IChangePassword, ICheckOrder, ICommentReview, IOrderRoom, IOrderTour, IResponseCommentReview, IResponseEditUser, IResponseOrderTour } from "@/typescript/home";
import axiosClient from "../axiosClient";

//Home Tour
export const fetchTravels = async () => {
  const res = await axiosClient.get('/room?page=1&perpage=3&type%5B%5D=tour')
  return res.data.data;
}

//Tour
export const fetchTour = async () => {
  const res = await axiosClient.get('/room?perpage=6&type%5B%5D=tour')
  return res.data.data;
}

//Home Room
export const fetchRooms = async () => {
  const res = await axiosClient.get('/room?page=1&perpage=3&type%5B%5D=room')
  return res.data.data;
}

//All Room
export const fetchAllRooms = async () => {
  const res = await axiosClient.get('/room?type%5B%5D=room')
  return res.data.data;
}


//Loc tt user
export const fetchHeaderUser = async (id: number) => {
  const res = await axiosClient.get(`/user/show/${id}`)
  return res.data;
}

//loc all tour
export const fetchTourism = async () => {
  const res = await axiosClient.get('/room?type%5B%5D=tour')
  return res.data.data;
}

//chi tiet room tour 
export const fetchDetail = async (id: number) => {
  const res = await axiosClient.get(`/room/detail/${id}`)
  return res.data;
}

//contact
export const fetchContact = async () => {
  const res = await axiosClient.get('/setting/contact')
  return res.data;
}

//review
export const fetchReview = async (id: number) => {
  const res = await axiosClient.get(`/review/${id}`)
  return res.data.data;
}

//post order tour
export const orderTourAPI = async (payload: IOrderTour): Promise<IResponseOrderTour> => {
  const res = await axiosClient.post("/order/booking-tour", payload);
  return res.data;
};

//post order room
export const orderRoomAPI = async (payload: IOrderRoom): Promise<IResponseOrderTour> => {
  const res = await axiosClient.post("/order/booking-room", payload);
  return res.data;
};

//All Order
export const fetchOrder = async () => {
  const res = await axiosClient.get(`/order/list-order`)
  return res.data;
}

export const fetchDetailOrder = async (id: string) => {
  const res = await axiosClient.get(`/order/show/${id}`)
  return res.data;
}

//post review
export const reviewCommentAPI = async (
  formData: FormData
): Promise<IResponseCommentReview> => {
  const res = await axiosClient.post("/review/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

//post edit user
export const editUserAPI = async (
  formData: FormData,
  id: number | undefined
): Promise<IResponseEditUser> => {
  const res = await axiosClient.post(`/user/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

//post edit password
export const editPasswordAPI = async (id: number | undefined, payload: IChangePassword) => {
  const res = await axiosClient.post(`/user/updatePs/${id}`, payload);
  return res.data;
};

//post check delete order
export const checkDeleteOrderAPI = async (id: string) => {
  const res = await axiosClient.post(`/order/cancel/${id}`);
  return res.data;
};
