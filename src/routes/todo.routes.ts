import { Router } from "express";
import {
    createTask,
    deleteAllTasks,
    deleteOneTodoTask,
    getAllTask,
    getOneTask,
    updateTask,
} from "../controllers/todo.controllers";
import auth from "../middlewares/auth";
const router: Router = Router();

router.post("/create-todo", auth, createTask);
router.put("/update-todo/:id", auth, updateTask);

router.get("/get-todo/:id", auth, getOneTask);
router.get("/get-all-todo", auth, getAllTask);

router.delete("/delete-one-todo/:id", auth, deleteOneTodoTask);
router.delete("/delete-all-todo", auth, deleteAllTasks);

export default router;
