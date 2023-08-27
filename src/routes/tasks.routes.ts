import { Router } from "express";
import { createTask } from "../controllers/tasks.controller";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/create-task", auth, createTask);

export default router;
