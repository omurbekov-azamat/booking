export interface HotelData {
  name: string;
  address: string;
  city: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  parking: boolean;
  petFriendly: boolean;
  swimmingPool: boolean;
  nonSmokingRooms: boolean;
}

export interface HotelMutation extends HotelData {
  star: string;
  image: File | null;
}

export interface Hotel extends HotelData {
  _id: string;
  userId: string;
  star: number;
  isPublished: boolean;
  image: string;
}

export interface HotelWithLabel extends Hotel {
  label: string;
}

export interface ApartmentData {
  price: {
    from: number;
    till: number;
  };
  description?: string;
  aircon: boolean;
  balcony: boolean;
  bath: boolean;
  family: boolean;
  food: boolean;
  place: number;
  tv: boolean;
  towel: boolean;
  wifi: boolean;
}

export interface ImgType {
  image: File | null;
}

export interface ApartmentMutation extends ApartmentData {
  hotelId: string;
  roomTypeId: string;
  images?: File[];
}

export interface ApartmentPopulated extends IApartment {
  hotelId: Hotel;
}

export interface IApartment extends ApartmentData {
  roomTypeId: {
    name: string;
    _id: string;
  };
  _id: string;
  images: string[];
}

export interface UpdateApartment {
  id: string;
  apartment: ApartmentMutation;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  role: string;
  phoneNumber: string;
  status?: string;
  cashback?: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterMutation extends LoginMutation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}

export interface SearchData {
  city: string;
  smoking: boolean;
  parking: boolean;
  pool: boolean;
  petFriendly: boolean;
}

export interface OrderData {
  dateArrival: string;
  dateDeparture: string;
  comment: string;
}

export interface OrderMutation extends OrderData {
  apartmentId: string;
}

export interface Order extends OrderData {
  adminId: User | null;
  apartmentId: ApartmentPopulated;
  createdAt: string;
  status: 'open' | 'in progress' | 'closed';
  userId: User;
  _id: string;
}
