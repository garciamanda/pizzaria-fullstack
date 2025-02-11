import prisma from "../config/db.js";

// lista de pedidos

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { pizza: true },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
};

// detalhes do pedido especifico

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Buscando pedido com ID:", id);
    console.log("Usuário autenticado:", req.user);

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { pizza: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    if (order.userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Acesso não autorizado." });
    }

    const formattedTotal = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(order.total);

    res.json({
      ...order,
      total: formattedTotal,
    });
  } catch (err) {
    console.error("Erro ao buscar pedido:", err);
    res.status(500).json({ error: "Erro ao buscar pedido." });
  }
};

// criar um pedido

export const createOrder = async (req, res) => {
  const { pizzaId, quantity } = req.body;

  try {
    const pizza = await prisma.pizza.findUnique({
      where: { id: pizzaId },
    });

    if (!pizza) {
      return res.status(404).json({ error: "Pizza nao encontrada." });
    }

    const total = pizza.price * quantity;

    const newOrder = await prisma.order.create({
      data: {
        userId: req.user.id,
        pizzaId,
        quantity,
        total,
      },
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar pedido." });
  }
};

// atualizar status de um pedido (admin)

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acesso negado." });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar status do pedido." });
  }
};

// deletar um pedido (admin)

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acesso negado." });
  }

  try {
    await prisma.order.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir pedido." });
  }
};
