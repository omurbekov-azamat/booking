import mongoose, { HydratedDocument, Types } from 'mongoose';
import User from './User';
import { IUser } from '../types';
import Apartment from './Apartment';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: 'User not found!',
    },
  },
  adminId: {
    type: Schema.Types.ObjectId || null,
    ref: 'User',
    required: true,
    default: null,
    validate: {
      validator: async (value: Types.ObjectId) => {
        if (value === null) {
          return true;
        }
        const user: HydratedDocument<IUser> | null = await User.findById(value);
        return user && user.role === 'admin';
      },
      message: 'cant find admin',
    },
  },
  apartmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Apartment',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Apartment.findById(value),
      message: 'Apartment not found!',
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
  },
  dateArrival: {
    type: String,
    required: true,
  },
  dateDeparture: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'open',
    enum: ['open', 'in progress', 'closed'],
  },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
