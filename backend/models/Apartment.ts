import mongoose, { Types } from 'mongoose';
import Hotel from './Hotel';
import RoomType from './RoomType';

const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
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
    type: String,
  },
  aircon: {
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
  family: {
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

const Apartment = mongoose.model('Apartment', ApartmentSchema);
export default Apartment;
