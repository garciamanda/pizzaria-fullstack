import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import pizzaRoutes from "./routes/pizzaRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { PORT } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
