import { sales, clients, products } from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

export const getAllSales = (req, res) => {
  res.json(sales);
};

export const getSaleById = (req, res) => {
  const sale = sales.find((sale) => sale.id === req.params.id);
  if (!sale) return res.status(404).json({ msg: "Venda não encontrada" });
  res.json(sale);
};

export const createSale = (req, res) => {
  const { clientId, productId, quantity } = req.body;

  const client = clients.find((cli) => cli.id === clientId);
  const product = products.find((prod) => prod.id === productId);

  if (!client || !product) {
    return res.status(400).json({ msg: "Cliente ou produto inválido" });
  }

  const total = product.price * quantity;

  const newSale = {
    id: uuidv4(),
    clientId,
    productId,
    quantity,
    total,
    data: new Date().toISOString(),
  };

  sales.push(newSale);
  res.status(201).json(newSale);
};

export const deleteSale = (req, res) => {
  const index = sales.findIndex((sale) => sale.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ msg: "Venda não encontrada" });
  sales.splice(index, 1);
  res.status(204).send();
};
