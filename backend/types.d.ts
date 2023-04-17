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
}
