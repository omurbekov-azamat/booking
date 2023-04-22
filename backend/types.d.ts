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
}

export interface ApartmentWithId {
  hotelId: ObjectId;
  roomTypeId: ObjectId;
  price: {
    from: number;
    till: number;
  };
  images: string[] | null;
  description: string;
}
