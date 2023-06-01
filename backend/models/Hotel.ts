import mongoose, { Types } from 'mongoose';
import User from './User';
import { IHotel } from '../types';

const Schema = mongoose.Schema;
const HotelSchema = new Schema<IHotel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User not found!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: { latitude: Number, longitude: Number },
  },
  star: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  nonSmokingRooms: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  swimmingPool: {
    type: Boolean,
    required: true,
  },
  petFriendly: {
    type: Boolean,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  founding: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number) => value > 1500,
      message: 'The founding year must be greater than 1500!',
    },
  },
  lowestPrice: {
    type: {
      som: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value > 0,
          message: 'The lowest price in som must be a positive number!',
        },
      },
      dollar: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value > 0,
          message: 'The lowest price in dollar must be a positive number!',
        },
      },
    },
    required: true,
  },
  description: {
    type: {
      ru: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['standard', 'premium', 'business'],
    default: 'standard',
  },
  type: {
    type: String,
    required: true,
    enum: ['hostel', 'pension', 'hotel', 'guestHouse'],
    default: 'hotel',
  },
});

const Hotel = mongoose.model('Hotel', HotelSchema);

export default Hotel;
