import mongoose, { Types } from 'mongoose';
import Hotel from './Hotel';
import RoomType from './RoomType';
import { IApartment } from '../types';

const Schema = mongoose.Schema;

const ApartmentSchema = new Schema<IApartment>({
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Hotel.findById(value),
      message: 'Hotel does not exist',
    },
  },
  roomTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => RoomType.findById(value),
      message: 'RoomType does not exist',
    },
  },
  price: {
    type: {
      from: {
        type: Number,
        required: true,
      },
      till: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  images: {
    type: [String],
    default: [],
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
  AC: {
    type: Boolean,
    required: true,
  },
  balcony: {
    type: Boolean,
    required: true,
  },
  bath: {
    type: Boolean,
    required: true,
  },
  petFriendly: {
    type: Boolean,
    required: true,
  },
  food: {
    type: Boolean,
    required: true,
  },
  place: {
    type: Number,
    required: true,
    min: 1,
  },
  tv: {
    type: Boolean,
    required: true,
  },
  towel: {
    type: Boolean,
    required: true,
  },
  wifi: {
    type: Boolean,
    required: true,
  },
});

const Apartment = mongoose.model<IApartment>('Apartment', ApartmentSchema);
export default Apartment;
