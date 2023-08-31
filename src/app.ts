import cookies from "cookie-parser";
import cors from "cors";
import express, { Request } from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";

import authRoutes from "./routes/auth.routes";
import tasksRoutes from "./routes/tasks.routes";
import todoRoutes from "./routes/todo.routes";
// initializations
const server = express();

const storage = multer.diskStorage({
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    callback(null, file.originalname);
  },
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    callback(null, path.join("src", "temp"));
  },
});

// middlewares
server.use(
  cors({
    origin: "http://localhost:5173",
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

// TODO: ver como colocar limites de peso
server.use(
  multer({
    storage,
  }).single("img")
);

server.use(cookies());

// routes
server.use(authRoutes);
server.use(tasksRoutes);
server.use(todoRoutes);

export default server;
