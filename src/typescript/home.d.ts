type IHome = {
  id: number,
  title: string,
  tour: string,
  image: string,
}

type IHotTour = {
  map: any;
  id: number;
  name: string;
  description: string;
  logo: string | StaticImport;
  cost: number;
  start_date: string;
  end_date: string;
  type_room: string;
  type: number;
  can_order: number;
  categories: {
    id: number;
    name: string;
    description: string;
    number: number;
  };
}

type IImage = {
  id: number;
  image: string;
}

export interface IUser { //sau khi post của user
  id: number;
  display_name: string;
  email: string;
  phone_number: string;
  avatar: string;
  role_id: number;
  status: number;
  verify: number;
  detail_address?: string;
}

export interface IAdmin { //sau khi post của admin
  id: number;
  display_name: string;
  avatar: string;
  role: string;
  token: string;
}

export interface ILoginPayload { //trước khi post user
  email: string;
  password: string;
  device_token?: string;
}

export interface IAdminPayload { //trước khi post admin
  email: string;
  password: string;
}

export interface IAuthResponse { //sau khi post auth
  user: IUser;
  isVerify: number;
  role: string;
  token: string;
}

export type IAdminResponse = IAdmin;

export interface IAuthState { //initialState
  token: string | null;
  user: IUser | null;
  role: string | null;
  status: string;
  error: string | null;
  verify: IVerifyResponse | null;
  admin: IAdmin | null;
}

export interface IRegisterPayload { //trước khi post register
  email: string;
  password: string;
  display_name: string;
  phone_number: string;
  detail_address: string;
}

export interface IVerifyPayload { //trước khi post verify
  email: string;
  code: string;
}

export interface IVerifyResponse { //sau khi post verify
  status: number;
  message: string;
}

type ITour = {
  data: IHotTour
  isLoading: any
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

type IPage = {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

type IContact = {
  phone_number: number
  email: string
  facebook: string
  zalo: string
}

export interface IReview {
  id: number;
  user_id: number;
  room_id: number;
  rate: number;
  content: string;
  user?: {
    id: number;
    email: string;
    avatar: string;
    display_name: string;
    phone_number: string;
  };
  room?: {
    id: number;
    name: string;
    description: string;
    type: number;
    logo: string;
    cost: number;
    start_date: string;
    end_date: string;
    status: number;
    type_room: string;
  };
  image?: {
    id: number;
    key: string;
    file_id: number;
    image_data: string;
  }[];
}

export interface IOrderTour { //trước khi post 
  id_room: string;
  id_user: number | undefined;
}

export interface IOrderRoom { //trước khi post 
  id_room: string;
  id_user: number | undefined;
  start_date: string;
  end_date: string;
}

export interface IResponseOrderTour { //sau khi post 
  room_id: string;
  user_id: string;
  status: string,
  cost: number,
  start_date: null,
  end_date: null,
  id: number,
}

export interface ICommentReview { //trước khi post 
  room_id: number;
  user_id: number | undefined;
  rate: number;
  content: string;
  images: string[];
}

export interface IResponseCommentReview { //sau khi post 
  room_id: number;
  user_id: number | undefined;
  rate: number;
  content: string;
  id: number;
}


export interface IUserState { //initialState
  tourOrder: IResponseOrderTour | null
  roomOrder: IResponseOrderTour | null
  commentReview: IResponseCommentReview | null
  userEdit: IResponseEditUser | null
  status: string;
  error: string | null;
}

export interface IResponseEditUser { //sau khi post 
  id: number;
  email: string;
  avatar: string;
  display_name: string;
  phone_number: number;
  role_id: number;
  status: number;
  has_edit: number;
  verify: number;
  detail_address: string;
  avatar_url: string;
}

export interface IChangePassword { //trước khi post 
  password: string;
  newPassword: string;
}

export interface ICheckOrder { //trước khi post 
  id: string;
}

//ADMIN

interface DashboardData {
  customer: number;
  order_pending: number;
  order_access: number;
  order_ending: number;
  order_cancel: number;
  order_pending_cancel: number;
  room: number;
  tour: number;
}

interface CustomerData {
  id: number;
  email: string,
  avatar: string,
  display_name: string,
  phone_number: string,
  role_id: number,
  status: number,
  has_edit: number,
  verify: number,
  detail_address: string
}

export interface IUpdateStatus { //trước khi post 
  status: boolean;
}

export interface IAdminState { //initialState
  statusUpdate: CustomerData | null;
  customerData: CustomerData[];
  staffData: StaffData[];
  staffEdit: IResponseNewStaff | null;
  categoryEdit: IEditCategory | null;
  categoryCreate: IEditCategory | null;
  categoryData: ICategoryData[];
  manageTourEdit: IResponseEditManageTour | null;
  manageTourData: IManageTour[];
  status: string;
  error: string | null;
}

export interface ICheckDeleteCustomer { //trước khi post 
  ids: string;
  id: string;
  deletedIds: number[];
}

interface StaffData {
  id: number;
  email: string,
  avatar: string,
  display_name: string,
  phone_number: string,
  role_id: number,
  status: number,
  has_edit: number,
  verify: number,
  detail_address: string
}

export interface IResponseEditStaff { //sau khi post 
  email: string,
  display_name: string,
  phone_number: string,
  role_id: string,
  detail_address: string
  avatar: string,
  status: number
  id: number
}

export interface IResponseNewStaff { //sau khi post 
  email: string,
  display_name: string,
  phone_number: string,
  role_id: string,
  detail_address: string
  avatar: string,
  status: number
  id: number
}

export interface IEditCategory { //trước khi post 
  name: string;
  number: string;
  description: string;
}

export interface ICategoryData {
  name: string;
  number: number;
  description: string;
  id: number
}

export interface IResponseEditManageTour { //sau khi post 
  type: string;
  name: string;
  description: string;
  logo: string;
  cost: string;
  start_date: string;
  end_date: string;
  status: number;
  id: number;
  type_room: string;
}

export interface IManageTourDetail {
  id: number;
  name: string;
  type: string;
  cost: string;
  status: string;
  start_date: string;
  end_date: string;
  description: string;
  logo: string;
  type_room: string
  categories: {
    id: number;
    name: string;
    number: number;
    description: string;
  }
}

export interface IEditTourForm {
  name: string;
  type: string;
  cost: string;
  status: string;
  start_date: string;  // "YYYY-MM-DD"
  end_date: string;    // "YYYY-MM-DD"
  description: string;

  logo: File | null;   // ảnh mới
  logo_delete: boolean; // backend yêu cầu xóa
  type_room: string
}

export interface ICreate {
  name: string;
  type: string;
  cost: string;
  status: string;
  start_date: string;
  end_date: string;
  description: string;
  logo: File | null;
  id: number;
  type_room: string;
}

export interface IManageTour {
  name: string;
  type: string;
  cost: string;
  status: string;
  start_date: string;
  end_date: string;
  description: string;
  logo: string;
  id: number;
  type_room: string;
  categories: {
    id: number;
    name: string;
    number: number;
    description: string;
  }
  banner: {
    id: number;
    file_id: number;
    image_data: string;
  }
}


export interface IEditStatusOrders {
  id: number;
  user_id: number;
  room_id: number;
  cost: string;
  start_date: string;
  end_date: string;
  status: string;
}


export interface NewsItem {
  id: number;
  title: string;
  date: string;
  description?: string;
  image: string | StaticImageData;
}

export interface NewsAPI {
  highlight: HighlightNews;
  mostViewed: Omit<NewsItem, "description" | "image">[];
  cards: NewsItem[];
  posts: NewsItem[];
}




