import { Types } from 'mongoose';

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

export interface ApartmentWithId {
  _id: Types.ObjectId;
  hotelId: Types.ObjectId;
  roomType: Types.ObjectId;
  price: {
    from: number;
    till: number;
  };
  images: string[] | null;
  info: string | null;
}
