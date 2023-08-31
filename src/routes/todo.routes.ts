import { Router } from "express";
import { createTask } from "../controllers/todo.controllers";
import auth from "../middlewares/auth";
const router: Router = Router();

router.post("/create-todo", auth, createTask);

export default router;
