import prisma from "../config/db.js";

// Controller para obter todos os usários

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usários." });
  }
};

// Controller para atualizar o role de um usuário especifico

export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { role },
    });

    if (updatedUser.role === role) {
      res.status(400).json({ error: "Role ja existe." });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar role do usuário." });
  }
};

// Controller para listar todos os pedidos

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
};

// Controller de dashboard para admin

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalPizzas = await prisma.pizza.count();
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        total: true, //
      },
    });

    res.json({
      totalUsers,
      totalPizzas,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
    });
  } catch (err) {
    console.error("Erro ao obter estatísticas do painel:", err);
    res
      .status(500)
      .json({ error: "Erro ao recuperar as estatísticas do painel." });
  }
};
