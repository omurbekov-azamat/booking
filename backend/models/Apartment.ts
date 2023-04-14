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
});

const Apartment = mongoose.model('Apartment', ApartmentSchema);
export default Apartment;
