import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models && mongoose.models["hotels"]) {
  delete mongoose.models["hotels"];
}

const HotelModel = mongoose.model("hotels", hotelSchema);
export default HotelModel;
