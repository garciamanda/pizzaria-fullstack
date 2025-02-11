import dotenv from "dotenv";

dotenv.config();

// criando variaveis de ambiente

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_secreta";
export const DATABASE_URL = process.env.DATABASE_URL;
