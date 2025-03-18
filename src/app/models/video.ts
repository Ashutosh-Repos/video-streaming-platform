import mongoose, { Schema, Document } from "mongoose";

interface Ivideo extends Document {
  owner: Schema.Types.ObjectId;
  video: string;
  thumbnail: string;
  title: string;
  description: string;
  public: boolean;
  createdAt: Date;
  views: number;
  likes: number;
}

const VideoSchema: Schema<Ivideo> = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

export const Video =
  (mongoose.models?.video as mongoose.Model<Ivideo>) ||
  mongoose.model<Ivideo>("video", VideoSchema);
