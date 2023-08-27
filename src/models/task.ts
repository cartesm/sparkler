import mongoose, { Document, Schema, model } from "mongoose";

export interface ITask extends Document {
  tittle: string;
  content: string;
  header: string | undefined;
  user: string | mongoose.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: false,
      default: "description",
    },
    user: {
      ref: "users",
      type: mongoose.Types.ObjectId,
    },
  },
  {
    collection: "tasks",
    timestamps: true,
  }
);

export default model<ITask>("tasks", taskSchema);
