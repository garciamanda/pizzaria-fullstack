import { OAuth2Client } from "google-auth-library";
import {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  revokeRefreshToken,
} from "../utils/jwt.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          googleId,
        },
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.json({ accessToken, refreshToken, role: user.role });
  } catch (error) {
    console.error("Erro ao autenticar com Google:", error);
    res.status(500).json({ error: "Erro ao autenticar com o Google." });
  }
};

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

    res.json({ accessToken, refreshToken, role: user.role });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: err.message || "Erro ao fazer login." });
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

    res.json({ accessToken, refreshToken, role: user.role });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res
      .status(500)
      .json({ error: err.message || "Erro ao registrar o usuário." });
  }
};

export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter informações do usuário." });
  }
};
