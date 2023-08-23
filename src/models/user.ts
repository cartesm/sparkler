import { Document, Schema, model } from "mongoose";

export interface IUsers extends Document {
  userName: string;
  password: string;
  email: string;
  image: Buffer;
}

const userSchema: Schema = new Schema(
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

export default model<IUsers>("user", userSchema);