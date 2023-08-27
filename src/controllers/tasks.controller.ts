import { Request, Response } from "express";
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
