import bcrypt from "bcrypt";
import { Request, Response } from "express";
import mongoose from "mongoose";
import userModel, { IUsers } from "../models/user";

import createToken from "../functions/createToken";
import uploadImage from "../functions/uploadImage";

export const register = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  try {
    const { password, userName, email } = req.body;
    const imgMulter = req.file;

    console.log(imgMulter);

    if (!password || !userName || !email) {
      return resp.status(401).json({ message: "not data provided" });
    }

    const emailMatch: IUsers | null = await userModel.findOne({ email });
    if (emailMatch) {
      return resp.status(401).json({ message: "this user is already in use" });
    }

    const passwordHash: string = await bcrypt.hash(password, 10);
    const newUser: IUsers = new userModel({
      userName,
      email,
      password: passwordHash,
    });

    if (imgMulter) {
      const imgUrl = await uploadImage(imgMulter);
      if (typeof imgUrl != "string") {
        return resp.status(406).json({ message: "error to try upload image" });
      }
      newUser.image = imgUrl;
    }

    await newUser.save();
    console.log(newUser);

    const token: string = createToken({
      id: newUser._id,
      name: newUser.userName,
    });

    resp.cookie("token", token, {
      maxAge: 172800000,
    });

    return resp.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
};

export const login = async (
  req: Request,
  resp: Response
): Promise<Response | undefined> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return resp.status(401).json({ message: "not data provided" });
  }
  try {
    const userMatch: IUsers | null = await userModel.findOne({ email });
    if (!userMatch) {
      return resp.status(404).json({ message: "user not found" });
    }

    const matchPassword: boolean = await bcrypt.compare(
      password,
      userMatch.password
    );

    if (!matchPassword) {
      // agragar un intento cuando la contraseña sea incorrecta
      req.counter++;
      return resp.status(401).json({ message: "the password is incorrect" });
    }

    const token: string = createToken({
      id: userMatch._id,
      name: userMatch.userName,
    });

    resp.cookie("token", token, {
      maxAge: 172800000,
    });

    return resp.status(202).json({
      userName: userMatch.userName,
      email,
    });
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  resp.clearCookie("token", {
    expires: new Date(),
  });
  return resp.status(200).json({ message: "loged out" });
};

export const deleteCount = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { password } = req.body;
  const id = req.user.id;

  if (!mongoose.isValidObjectId(id)) {
    return resp.status(401).json({ message: "id are been corrupted" });
  }

  try {
    const userMatch: IUsers | any = await userModel.findOne({ _id: id });

    const matchPassword: boolean = await bcrypt.compare(
      password,
      userMatch.password
    );
    if (!matchPassword) {
      return resp.status(401).json({ message: "the password is incorrect" });
    }
    const deletedUser: IUsers | any = await userModel.findOneAndDelete({
      _id: userMatch._id,
    });

    resp.clearCookie("token", {
      expires: new Date(),
    });

    return resp.status(202).json({
      userName: deletedUser.userName,
      email: deletedUser.email,
      message: "user deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
