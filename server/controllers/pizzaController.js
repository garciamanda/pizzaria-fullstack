import prisma from "../config/db.js";

// Controller para obter todas as pizzas
export const getPizzas = async (req, res) => {
  try {
    const pizzas = await prisma.pizza.findMany();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pizzas." });
  }
};
// Controller para obter uma pizza específica

export const getPizzaById = async (req, res) => {
  const { id } = req.params;

  try {
    const pizza = await prisma.pizza.findUnique({ where: { id: Number(id) } });
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pizza." });
  }
};

// Controller para adicionar uma nova pizza

export const addPizza = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price || !imageUrl) {
    return res
      .status(400)
      .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  try {
    const existingPizza = await prisma.pizza.findUnique({
      where: { name },
    });

    if (existingPizza) {
      return res
        .status(409)
        .json({ error: "Uma pizza com este nome já existe." }); // Código 409 = Conflito
    }

    // Criar a nova pizza
    const newPizza = await prisma.pizza.create({
      data: { name, description, price, imageUrl },
    });

    res.status(201).json(newPizza); // Código 201 = Criado com sucesso
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao adicionar pizza.", message: err.message });
  }
};

// Controller para atualizar uma pizza existente

export const updatePizza = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price || !imageUrl) {
    return res
      .status(400)
      .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  try {
    const updatedPizza = await prisma.pizza.update({
      where: { id: Number(id) },
      data: { name, description, price, imageUrl },
    });
    res.json(updatedPizza);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar pizza." });
  }
};

// Controller para excluir uma pizza existente

export const deletePizza = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pizza.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir pizza." });
  }
};
