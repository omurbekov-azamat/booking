export interface Hotel {
  _id: string;
  userId: string;
  name: string;
  address: string;
  city: string;
  location: {
    latitude: number;
    longitude: number;
  };
  star: number;
  description: string;
  isPublished: boolean;
  image: string;
  parking: boolean;
  petFriendly: boolean;
  swimmingPool: boolean;
  nonSmokingRooms: boolean;
}

export interface HotelWithLabel extends Hotel {
  label: string;
}

export interface HotelMutation {
  name: string;
  address: string;
  city?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  star: string;
  image: File | null;
  parking?: boolean;
  petFriendly?: boolean;
  swimmingPool?: boolean;
  nonSmokingRooms?: boolean;
}

export interface IApartment {
  _id: string;
  hotelId: string;
  roomTypeId: string;
  price: {
    type: number;
    till: number;
  };
  images?: string[];
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

export interface ApartmentMutation {
  hotelId: string;
  roomTypeId: string;
  price: {
    type: number;
    till: number;
  };
  images?: string[];
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

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
  phoneNumber: string;
  status?: string;
  cashback?: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  email: string;
  password: string;
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
  city: string,
  smoking: boolean,
  parking: boolean,
  pool: boolean,
  petFriendly: boolean,
}
