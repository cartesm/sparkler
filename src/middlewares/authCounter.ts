import { NextFunction, Request, Response } from "express";

const counter = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<NextFunction | Response | void> => {
  const counter = req.counter;
  const twelveHoursInMiliseconds: number = 43200000;

  if (counter > 5) {
    const resetAttemps: any = setTimeout(() => {
      req.counter = 0;
      return clearTimeout(resetAttemps);
    }, twelveHoursInMiliseconds);
    return resp
      .status(423)
      .json({ message: "maximum attempts achieved, try in a few hours later" });
  }
  next();
};

export default counter;
