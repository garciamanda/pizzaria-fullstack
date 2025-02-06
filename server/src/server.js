import express from "express";
import dotenv from "dotenv";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";
import cors from "cors"
import path from "path";



dotenv.config();

const app = express();

app.use(cors())


app.use(express.json());
app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;

