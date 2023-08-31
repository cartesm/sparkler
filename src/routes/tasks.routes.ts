import { Router } from "express";
import {
  createTask,
  deleteAllTasks,
  deleteOneTask,
  getAllTask,
  getOneTask,
  updateTask,
} from "../controllers/tasks.controller";
import auth from "../middlewares/auth";

const router: Router = Router();

// TODO: provar rutas
router.post("/create-task", auth, createTask);

router.put("/update-task/:id", auth, updateTask);

router.delete("/delete-all", auth, deleteAllTasks);
router.delete("/delete-one/:id", auth, deleteOneTask);

router.get("/get-all", auth, getAllTask);
router.get("/get-task/:id", auth, getOneTask);

export default router;
