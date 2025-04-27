import { products } from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

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
