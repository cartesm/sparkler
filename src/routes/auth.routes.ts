import { Router } from "express";
import {
  deleteCount,
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
// TODO: crear ruta para obtener los datos del usuario

router.delete("/deleteAcount", auth, deleteCount);

export default router;
