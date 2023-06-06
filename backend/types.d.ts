import { ObjectId } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  status: string;
  cashback: number;
  token: string;
  favorites: ObjectId[];
  googleId?: string;
  isVerified: boolean;
  verificationToken: string | null;
}

export interface IRoomType {
  name: {
    ru: string;
    en: string;
  };
}

export interface HotelFact {
  nonSmokingRooms?: boolean;
  parking?: boolean;
  swimmingPool?: boolean;
  petFriendly?: boolean;
  city?: string;
  star?: string;
  type?: string;
}

export interface IHotel {
  userId: ObjectId;
  name: string;
  address: {
    adrRu: string;
    adrEn: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  description: {
    ru: string;
    en: string;
  };
  star: number;
  isPublished: boolean;
  image: string | null;
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
  type: string;
}

export interface IApartment {
  hotelId: ObjectId;
  roomTypeId: ObjectId;
  price: {
    usd: number;
    kgs: number;
  };
  images: string[] | null;
  description: {
    ru: string;
    en: string;
  };
  AC: boolean;
  balcony: boolean;
  bath: boolean;
  petFriendly: boolean;
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
  personalTranslator: boolean;
  meetingAirport: boolean;
  tourManagement: boolean;
  eventManagement: boolean;
}

export interface IComment {
  author: ObjectId;
  hotel: ObjectId;
  text: string;
  createdAt: Date;
}

export interface IApartmentMutation extends IApartment {
  hotelId: IHotel;
  roomTypeId: IRoomType;
}
