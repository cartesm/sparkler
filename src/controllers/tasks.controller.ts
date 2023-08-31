import { Request, Response } from "express";
import mongoose from "mongoose";
import taskModel, { ITask } from "../models/task";

export const createTask = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { content, tittle, header } = req.body;
  const { id } = req.user;
  if (!content || !tittle) {
    return resp.status(401).json({ message: "not data provided" });
  }
  try {
    const newTask: ITask = new taskModel({
      tittle,
      content,
      user: id,
    });

    if (header) {
      newTask.header = header;
    }

    await newTask.save();

    return resp.status(201).json(newTask);
  } catch (err) {
    console.log(err);
  }
};

export const deleteOneTask = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { id } = req.params;
  const { id: userID } = req.user;
  if (!userID) {
    return resp.status(401).json({ message: "this user is not auhenticated" });
  }
  if (!id) {
    return resp.status(400).json({ message: "params are not found" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return resp.status(400).json({ message: "the params are been corrupted" });
  }

  const taskDeleted = await taskModel.findOneAndDelete({ _id: id });

  return resp.status(200).json(taskDeleted);
};

export const deleteAllTasks = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { id } = req.user;
  if (!id) {
    return resp.status(401).json({ message: "this user is not auhenticated" });
  }

  const tasksDeleted = await taskModel.deleteMany({
    user: id,
  });

  return resp.status(200).json(tasksDeleted);
};

export const updateTask = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { id } = req.params;
  const { id: userID } = req.user;
  if (!userID) {
    return resp.status(401).json({ message: "this user is not auhenticated" });
  }
  if (!id) {
    return resp.status(400).json({ message: "params not found" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return resp.status(400).json({ message: "the params are been corrupted" });
  }

  const { header, content, tittle } = req.body;

  const updateTask: ITask | null = await taskModel.findOneAndUpdate(
    { _id: id },
    { $set: { header, tittle, content } },
    { new: true }
  );

  return resp.status(200).json(updateTask);
};

export const getAllTask = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { id: userID } = req.user;

  if (!userID) {
    return resp.status(401).json({ message: "this user is not auhenticated" });
  }

  const matchsTask: Array<ITask> = await taskModel.find({ user: userID });
  if (matchsTask.length == 0) {
    return resp.status(204).json({ message: "not tasks in this user" });
  }

  return resp.status(200).json(matchsTask);
};

export const getOneTask = async (
  req: Request,
  resp: Response
): Promise<Request | any> => {
  const { id } = req.params;
  const { id: userID } = req.user;
  if (!userID) {
    return resp.status(401).json({ message: "this user is not auhenticated" });
  }
  if (!id) {
    return resp.status(400).json({ message: "params not found" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return resp.status(400).json({ message: "the params are been corrupted" });
  }

  const taskMatch: ITask | null = await taskModel.findOne({ _id: id });

  return resp.status(200).json(taskMatch);
};
