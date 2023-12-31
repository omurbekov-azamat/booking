import mongoose, { HydratedDocument, Types, Schema } from 'mongoose';
import User from './User';
import Apartment from './Apartment';
import { IOrder, IUser } from '../types';

const OrderSchema = new Schema<IOrder>({
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
    type: Schema.Types.ObjectId,
    ref: 'User',
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
      message: 'apartments not found!',
    },
  },
  createdAt: {
    type: String,
    required: true,
    default: new Date().toISOString(),
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
  personalTranslator: Boolean,
  meetingAirport: Boolean,
  tourManagement: Boolean,
  eventManagement: Boolean,
  amountOfDays: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: {
      usd: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value > 0,
          message: 'The price in kgs must be a positive number!',
        },
      },
      kgs: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value > 0,
          message: 'The  price in usd must be a positive number!',
        },
      },
    },
    required: true,
  },
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
