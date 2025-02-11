import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// rotas publicas

router.get("/", authenticate, getOrders);
router.get("/:id", authenticate, getOrderById);
router.post("/", authenticate, createOrder);

// rotas privadas para admin

router.put("/:id", authenticate, isAdmin, updateOrderStatus);
router.delete("/:id", authenticate, isAdmin, deleteOrder);

export default router;
