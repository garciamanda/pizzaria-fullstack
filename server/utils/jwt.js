import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

// Função para gerar token
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Função para gerar token de acesso
export const generateAccessToken = (user) => {
  return generateToken(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET_ACCESS,
    "15m"
  );
};

// Função para gerar token de atualização
export const generateRefreshToken = async (user) => {
  // Gere o refreshToken
  const refreshToken = generateToken(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET_REFRESH,
    "7d"
  );

  // Salve o refreshToken no banco de dados
  await prisma.token.create({
    data: {
      token: refreshToken,
      userId: user.id, // Relaciona com o ID do usuário
    },
  });

  return refreshToken;
};

// Função para verificar token
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Token inválido ou expirado.");
  }
};

// Função para renovar token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyToken(refreshToken, process.env.JWT_SECRET_REFRESH);

    const storedToken = await prisma.token.findFirst({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      throw new Error("Refresh token inválido ou revogado.");
    }

    // Gere um novo accessToken
    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    return { accessToken: newAccessToken };
  } catch (err) {
    console.error(err.message); // Log do erro para debugging
    throw new Error("Não foi possível renovar o token de acesso.");
  }
};

// Função para revogar token
export const revokeRefreshToken = async (refreshToken) => {
  try {
    await prisma.token.deleteMany({
      where: {
        token: refreshToken,
      },
    });
  } catch (err) {
    throw new Error("Não foi possível revogar o token.");
  }
};
