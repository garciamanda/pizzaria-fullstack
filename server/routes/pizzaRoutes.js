import express from "express";
import {
  getPizzas,
  getPizzaById,
  addPizza,
  updatePizza,
  deletePizza,
} from "../controllers/pizzaController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas de pizzas

// rotas publicas
router.get("/", getPizzas);
router.get("/:id", getPizzaById);

// rotas privadas para admin
router.post("/", authenticate, isAdmin, addPizza);
router.put("/:id", authenticate, isAdmin, updatePizza);
router.delete("/:id", authenticate, isAdmin, deletePizza);

export default router;
