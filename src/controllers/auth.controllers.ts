import { Request, Response } from "express";
import userModel from "../models/user";

export const register = async (req: Request, resp: Response) => {
  try {
    const { password, userName, email, image } = req.body;
    if (!password || !userName || !email) {
      return resp.status(401).json({ message: "not data provided" });
    }

    const emailMatch = await userModel.findOne({ email });
    if (emailMatch) {
      return resp.status(401).json({ message: "this user is already in use" });
    }
    const newUser = new userModel(req.body);

    await newUser.save();

    // TODO: crear token en cookie

    return resp.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
};
