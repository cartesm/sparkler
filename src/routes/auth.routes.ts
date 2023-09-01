import { Router } from "express";
import {
  deleteCount,
  getUser,
  login,
  logout,
  register,
} from "../controllers/auth.controllers";
import auth from "../middlewares/auth";
import attempsCounter from "../middlewares/authCounter";

const router: Router = Router();

router.post("/register", register);
router.post("/login", attempsCounter, login);
router.post("/logout", logout);

// TODO: crear rutas de actualizacion

router.get("/get-user", auth, getUser);

router.delete("/deleteAcount", auth, deleteCount);

export default router;
