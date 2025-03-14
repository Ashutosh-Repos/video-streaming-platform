import mongoose from "mongoose";

const MONGOURI = process.env.MONGOURI!;

if (!MONGOURI) {
  throw new Error(
    "Please define the MONGODURI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGOURI).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("connected");
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
