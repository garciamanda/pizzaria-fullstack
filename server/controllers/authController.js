import {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  revokeRefreshToken,
} from "../utils/jwt.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";

// login usuário
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    console.log("Refresh Token gerado:", refreshToken); // Verifique no console

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer login." });
  }
};

// logout usuário
export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    await revokeRefreshToken(refreshToken);
    res.json({ message: "Logout realizado com sucesso." });
  } catch (err) {
    res.status(500).json({ error: "Erro ao realizar logout." });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const { accessToken } = await refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// criar usuário
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    console.log("Refresh Token gerado:", refreshToken); // Verifique no console

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res
      .status(500)
      .json({ error: err.message || "Erro ao registrar o usuário." });
  }
};

// mostrar usuário informações do usuário logado
export const me = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter informações do usuário." });
  }
};
