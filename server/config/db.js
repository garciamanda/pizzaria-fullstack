import { PrismaClient } from "@prisma/client";

// Fazendo a conexão com o banco de dados

const prisma = new PrismaClient();

export default prisma;
