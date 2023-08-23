import cookies from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";

// initializations
const server = express();

// middlewares
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(cookies());

// routes
server.use(authRoutes);

export default server;
