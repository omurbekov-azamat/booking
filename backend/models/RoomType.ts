import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const RoomTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const RoomType = mongoose.model('Hotel', RoomTypeSchema);

export default RoomType;
