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
}

export interface ILoginPayload { //trước khi post user
  email: string;
  password: string;
  device_token?: string;
}

export interface IAuthResponse { //sau khi post auth
    user: IUser;
    isVerify: number;
    // role: string;
    token: string;
}

export interface IAuthState { //initialState
  token: string | null;
  user: IUser | null;
  status: string;
  error: string | null;
  verify: IVerifyResponse | null;
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