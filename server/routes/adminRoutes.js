import express, { Router } from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  updateUserRole,
  getAllOrders,
  getDashboardStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", authenticate, isAdmin, getAllUsers);
router.get("/orders", authenticate, isAdmin, getAllOrders);
router.get("/dashboard", authenticate, isAdmin, getDashboardStats);
router.put("/:userId", authenticate, isAdmin, updateUserRole);

export default router;
