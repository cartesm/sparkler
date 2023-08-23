import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import configs from "../config";

interface IuserReq extends Request {
  user: {
    id: string;
    name: string;
  };
}

const protectedRoutes = async (
  req: IuserReq,
  resp: Response,
  next: NextFunction
): Promise<any> => {
  const { token } = req.cookies;

  if (!token) {
    return resp.status(401).json({ message: "this user is not authorized" });
  }

  // any types porque no pude encontrar su tipo
  jwt.verify(token, configs.masterKeyJwt, (err: any, decoded: any) => {
    if (err) {
      return resp.status(401).json({ message: "this token is not valid" });
    }
    req.user = decoded;
  });
  next();
};

export default protectedRoutes;
