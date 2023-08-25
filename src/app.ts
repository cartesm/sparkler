import cookies from "cookie-parser";
import cors from "cors";
import express, { Request } from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import authRoutes from "./routes/auth.routes";

// initializations
const server = express();

const storage = multer.diskStorage({
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    callback(null, `${new Date()}-${file.originalname}`);
  },
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    callback(null, path.join("src", "/temp"));
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null) => void
) => {
  const types = ["bmp", "jpg", "png", "tif", "jpge", "gif"];
  let ext = path.extname(file.originalname);
  console.log(ext);

  if (!types.includes("." + ext)) {
    return callback(new Error("type of this ´image´ is not admited"));
  }
  callback(null);
};

// middlewares
server.use(
  cors({
    credentials: false,
  })
);

server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.use(morgan("dev"));

// TODO: ver como comocar limites de peso
server.use(
  multer({
    storage,
    fileFilter,
    dest: path.join("src", "temp"),
  }).single("image")
);

server.use(cookies());

// routes
server.use(authRoutes);

export default server;
