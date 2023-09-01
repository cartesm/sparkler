import { Request, Response } from "express";
import mongoose from "mongoose";
import ToDoModel, { IToDo } from "../models/toDo";

export const createTask = async (
  req: Request,
  resp: Response
): Promise<Response | void> => {
  const { tasks, tittle } = req.body;
  const { id: userID } = req.user;
  // ! la estructuta de data debe de ser vertificada
  try {
    if (!userID) {
      return resp.status(401).json({ message: "user not autenticated" });
    }
    if (!tasks || !tittle) {
      return resp.status(401).json({ message: "not data provided" });
    }

    const newToDoTask: IToDo = new ToDoModel({
      user: userID,
      tasks,
      tittle,
    });

    await newToDoTask.save();

    return resp.status(202).json(newToDoTask);
  } catch (err) {
    console.log(err);
  }
};

export const deleteOneTodoTask = async (
  req: Request,
  resp: Response
): Promise<Response | void> => {
  const { id } = req.params;
  const { id: userID } = req.user;

  try {
    if (!userID) {
      return resp.status(401).json({ message: "user not autenticated" });
    }
    if (!id) {
      return resp.status(400).json({ message: "params not defined" });
    }
    if (!mongoose.isValidObjectId(id)) {
      return resp
        .status(400)
        .json({ message: "the params ared not valid objectID" });
    }

    const deletedTask: IToDo | null = await ToDoModel.findOneAndDelete({
      _id: userID,
    });

    return resp.status(200).json(deletedTask);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllTasks = async (
  req: Request,
  resp: Response
): Promise<Response | void> => {
  const { id: userID } = req.user;

  try {
    if (!userID) {
      return resp.status(401).json({ message: "user not autenticated" });
    }

    const deletedTasks: any = await ToDoModel.deleteMany({
      user: userID,
    });

    return resp.status(200).json(deletedTasks);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (
  req: Request,
  resp: Response
): Promise<Response | void> => {
  const { tittle, tasks } = req.body;
  const { id } = req.params;

  try {
    if (!id) {
      return resp.status(400).json({ message: "params not defined" });
    }
    if (!mongoose.isValidObjectId(id)) {
      return resp
        .status(400)
        .json({ message: "the params ared not valid objectID" });
    }
    if (!tittle || !tasks) {
      return resp.status(400).json({ message: "the data is undefined" });
    }

    const updatedTask: IToDo | null = await ToDoModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          tittle,
          tasks,
        },
      },
      { new: true }
    );

    return resp.status(200).json(updatedTask);
  } catch (err) {
    console.log(err);
  }
};

export const getOneTask = async (
  req: Request,
  resp: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    if (!id) {
      return resp.status(400).json({ message: "params not defined" });
    }
    if (!mongoose.isValidObjectId(id)) {
      return resp
        .status(400)
        .json({ message: "the params ared not valid objectID" });
    }

    const matchTask = await ToDoModel.findOne({ _id: id });

    return resp.status(200).json(matchTask);
  } catch (err) {
    console.log(err);
  }
};

export const getAllTask = async (
  req: Request,
  resp: Response
): Promise<Response | void> => {
  const { id: userID } = req.user;

  try {
    if (!userID) {
      return resp.status(401).json({ message: "user not autenticated" });
    }

    const matchsTasks: Array<IToDo> | null = await ToDoModel.find({
      user: userID,
    });

    return resp.status(200).json(matchsTasks);
  } catch (err) {
    console.log(err);
  }
};
