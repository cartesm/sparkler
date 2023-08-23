import { Schema, model } from "mongoose";

export interface Isers {
  userName: string;
  password: string;
  email: string;
  image: Buffer;
}

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    options: {},
    image: Buffer,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default model("user", userSchema);
