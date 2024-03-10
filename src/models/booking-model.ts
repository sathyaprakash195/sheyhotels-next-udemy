import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
      default: "Booked",
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["bookings"]) {
  delete mongoose.models["bookings"];
}

const BookingModel = mongoose.model("bookings", bookingSchema);
export default BookingModel;
