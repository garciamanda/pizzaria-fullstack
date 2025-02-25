import express from "express";
import {
  googleLogin,
  register,
  login,
  logout,
  refreshToken,
  me,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas de autenticação

router.post("/google", googleLogin);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/me", authenticate, me);

export default router;
