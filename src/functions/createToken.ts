import jwt from "jsonwebtoken";
import configs from "../config";

const createToken = (payload: string | Object): string => {
  return jwt.sign(payload, configs.masterKeyJwt, {
    expiresIn: "2d",
  });
};

export default createToken;
