import axios from "axios"

export const fetchTravels = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/room?page=1&perpage=3&search=tour')
  return res.data.data.data;
}

export const fetchRooms = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/room?page=1&perpage=3&search=room')
  return res.data.data.data;
}