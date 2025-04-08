import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface Iuser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  username?: string;
  fullname: string;
  password?: string;
  gender: "M" | "F" | "O";
  age: number;
  createdAt?: Date;
  avatar?: string;
  cover?: string;
  watchHistory?: Schema.Types.ObjectId[];
  verifyCode?: string;
  forgotCode?: string;
  verified: boolean;
}

const UserSchema: Schema<Iuser> = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email",
      ],
      unique: [true, "user with email already exists"],
    },
    username: {
      type: String,
      unique: [true, "username must be unique"],
      sparse: true,
      match: [/^[a-zA-Z0-9_]+$/, "invalid username"],
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
    verifyCode: {
      type: String,
    },
    forgotCode: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    cover: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

export const userModel =
  (mongoose.models?.users as mongoose.Model<Iuser>) ||
  mongoose.model<Iuser>("users", UserSchema);
