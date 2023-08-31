import mongoose, { Document, Schema, model } from "mongoose";

export interface IToDo extends Document {
  user: string;
  tittle: string;
  tasks: [
    {
      name: string;
      id: string;
      data: {
        content: string;
        name: string;
        id: string;
      };
    }
  ];
}

const toDoSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    tasks: [
      {
        name: {
          type: String,
        },
        data: {
          content: {
            type: String,
          },
          name: {
            type: String,
          },
          _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
          },
        },
      },
    ],
  },
  {
    collection: "todo",
    timestamps: true,
  }
);

export default model<IToDo>("todo", toDoSchema);
