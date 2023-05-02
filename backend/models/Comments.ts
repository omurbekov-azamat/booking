import mongoose, { Types, Schema } from 'mongoose';
import User from './User';
import { IComment } from '../types';
import Hotel from './Hotel';

const CommentSchema = new Schema<IComment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: 'User not found!',
    },
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Hotel.findById(value),
      message: 'Hotel not found!',
    },
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
