import { products } from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

export const listProducts = (req, res) => {
  const {
    page = 1,
    size = 10,
    orderBy = "id",
    order = "asc",
    filter,
  } = req.query;

  let result = [...products];

  if (filter) {
    const term = filter.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
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
      return order === asc ? campoA - campoB : campoB - campoA;
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

export const getAllProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = products.find((prod) => prod.id === req.params.id);
  if (!product) return res.status(404).json({ msg: "Produto não encontrado" });
  res.json(product);
};

export const createProduct = (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const index = products.findIndex((prod) => prod.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ msg: "Produto não encontrado" });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

export const deleteProduct = (req, res) => {
  const index = products.findIndex((prod) => prod.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ msg: "Produto não encontrado" });
  products.splice(index, 1);
  res.status(204).send();
};
