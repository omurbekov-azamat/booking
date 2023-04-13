import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;
const HotelSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: "User not found!",
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
        type: {latitude: Number, longitude: Number},
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
});

const Hotel = mongoose.model("Hotel", HotelSchema);

export default Hotel;