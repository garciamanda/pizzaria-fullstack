import jwt from "jsonwebtoken";

// Middleware de autenticação
export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Exemplo: "Bearer <token>"

  if (!token) {
    return res
      .status(403)
      .json({ error: "Token de autenticação não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
    req.user = decoded; // Adiciona o usuário decodificado à requisição
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

// Middleware de admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acesso negado. Você não é admin." });
  }
  next();
};
