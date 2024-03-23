import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    _id:mongoose.Schema.Types.ObjectId,
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const user = mongoose.model("user", userSchema);
