import { Request, Response } from "express";
import ToDoModel, { IToDo } from "../models/toDo";


export const createTask = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { tasks, tittle } = req.body;
  const { id: userID } = req.user;
  // ! la estructuta de data debe se ser vertificada
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
