import { ObjectId } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  status?: string;
  cashback?: string;
  token: string;
  favorites: ObjectId[];
}

export interface IRoomType {
  name: string;
}

export interface HotelFact {
  nonSmokingRooms?: boolean;
  parking?: boolean;
  swimmingPool?: boolean;
  petFriendly?: boolean;
  city?: string;
  star?: string;
}

export interface IHotel {
  userId: ObjectId;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  star: number;
  isPublished: boolean;
  image: string;
  nonSmokingRooms: boolean;
  parking: boolean;
  swimmingPool: boolean;
  petFriendly: boolean;
  city: string;
  founding: number;
  lowestPrice: {
    som: number;
    dollar: number;
  };
  status: string;
}

export interface IApartment {
  hotelId: ObjectId;
  roomTypeId: ObjectId;
  price: {
    from: number;
    till: number;
  };
  images: string[] | null;
  description: string;
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

export interface IOrder {
  userId: ObjectId;
  adminId: ObjectId | undefined;
  apartmentId: ObjectId;
  createdAt: string;
  comment: string;
  dateArrival: string;
  dateDeparture: string;
  status: string;
}

export interface IComment {
  author: ObjectId;
  hotel: ObjectId;
  text: string;
  createdAt: Date;
}
