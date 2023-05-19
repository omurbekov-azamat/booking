import mongoose from 'mongoose';
import { IRoomType } from '../types';

const Schema = mongoose.Schema;
const RoomTypeSchema = new Schema<IRoomType>({
  name: {
    ru: {
      type: String,
      required: true,
      unique: true,
    },
    en: {
      type: String,
      required: true,
      unique: true,
    },
  },
});

const RoomType = mongoose.model('RoomType', RoomTypeSchema);

export default RoomType;
