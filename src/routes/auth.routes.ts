import { Router } from "express";
import {
  deleteCount,
  login,
  logout,
  register,
} from "../controllers/auth.controllers";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// TODO: ver si se pueden hacer mas tipos de validaciones
// TODO: usar el mongoose.pre para encriptar mas automaticamente
// TODO: crear rutas de actualizacion



router.delete("/deleteAcount/:id", auth, deleteCount);

export default router;
