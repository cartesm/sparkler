import mongoose from "mongoose";
import configs from "./config";

export const connectDB = async () => {
  try {
    await mongoose.connect(configs.db.uri);
    console.log("db is connected");
  } catch (err) {
    console.log("error to try connect db");
    console.log(err);
  }
};
