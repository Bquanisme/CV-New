import axiosClient from "../axiosClient";

//Home Tour
export const fetchTravels = async () => {
  const res = await axiosClient.get('/room?page=1&perpage=3&search=tour')
  return res.data.data;
}

//Home Room
export const fetchRooms = async () => {
  const res = await axiosClient.get('/room?page=1&perpage=3&search=room')
  return res.data.data;
}

//Loc tt user
export const fetchHeaderUser = async (id: number) => {
  const res  = await axiosClient.get(`/user/show/${id}`)
  return res.data;
}

//loc all tour
export const fetchTourism = async () => {
  const res = await axiosClient.get('/room?type%5B%5D=tour')
  return res.data.data;
}

//chi tiet tour
export const fetchDetailTour = async (id: number) => {
  const res  = await axiosClient.get(`/room/detail/${id}`)
  return res.data;
}
