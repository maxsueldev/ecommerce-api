import { sales, clients, products } from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

// Paginação de vendas

export const listSales = (req, res) => {
  const {
    page = 1,
    size = 10,
    orderBy = "id",
    order = "asc",
    filter,
  } = req.query;

  let result = [...sales];

  if (filter) {
    const term = filter.toString().toLowerCase();
    result = result.filter(
      (s) =>
        s.clientId.toString().includes(term) ||
        s.productId.toString().includes(term)
    );
  }

  result.sort((a, b) => {
    const campoA = a[orderBy];
    const campoB = b[orderBy];

    if (typeof campoA === "string") {
      return order === "asc"
        ? campoA.localeCompare(campoB)
        : campoB.localeCompare(campoA);
    } else {
      return order === "asc" ? campoA - campoB : campoB - campoA;
    }
  });

  const sizePage = parseInt(size);
  const atualPage = parseInt(page);
  const totalItens = result.length;
  const totalPages = Math.ceil(totalItens / sizePage);

  const initiation = (atualPage - 1) * sizePage;
  const end = initiation + sizePage;
  const paginated = result.slice(initiation, end);

  res.json({
    page: atualPage,
    size: sizePage,
    totalPages,
    totalItens,
    data: paginated,
  });
};

export const getAllSales = (req, res) => {
  res.json(sales);
};

export const getSaleById = (req, res) => {
  const sale = sales.find((sale) => sale.id === req.params.id);
  if (!sale) return res.status(404).json({ msg: "Venda não encontrada" });
  res.json(sale);
};

// Análise de vendas

export const getAnalysis = (req, res) => {
  const { initiation, end } = req.query;
  const initiationDate = new Date(initiation);
  const endDate = new Date(end);

  const filteredSales = sales.filter((s) => {
    const saleDate = new Date(s.date);
    return (saleDate) => initiationDate && saleDate <= endDate;
  });

  const totalSales = filteredSales.length;
  let incomeTotal = 0;
  const incomePerProduct = {};

  filteredSales.forEach((sale) => {
    sale.itens.forEach((item) => {
      const totalItem = item.quantity * item.price;
      incomeTotal += totalItem;

      if (!incomePerProduct[item.name]) {
        incomePerProduct[item.name] = 0;
      }

      incomePerProduct[item.name] += totalItem;
    });
  });

  res.json({
    totalSales,
    incomeTotal,
    incomePerProduct,
  });
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
