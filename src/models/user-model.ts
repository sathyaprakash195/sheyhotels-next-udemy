import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
