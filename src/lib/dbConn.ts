import mongoose from "mongoose";

type ConnectionObj = {
  isConnected?: Number;
};

const connection: ConnectionObj = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already coonected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGOURI || "");
    connection.isConnected = db.connections[0].readyState;

    console.log("Db connection is successfull");
  } catch (err) {
    console.log("Db connection is failed", err);
    process.exit(1);
  }
}
