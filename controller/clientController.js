import { clients } from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

export const listClients = (req, res) => {
  const {
    page = 1,
    size = 10,
    orderBy = "id",
    order = "asc",
    filter,
  } = req.query;

  let result = [...clients];

  if (filter) {
    const term = filter.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
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

export const getAllClients = (req, res) => {
  res.json(clients);
};

export const getClientById = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  if (!client) return res.status(404).json({ msg: "Cliente não encontrado" });
  res.json(client);
};

export const createClient = (req, res) => {
  const newClient = { id: uuidv4(), ...req.body };
  clients.push(newClient);
  res.status(201).json(newClient);
};

export const updateClient = (req, res) => {
  const index = clients.findIndex((client) => client.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ msg: "Cliente não encontrado" });
  clients[index] = { ...clients[index], ...req.body };
  res.json(clients[index]);
};

export const deleteClient = (req, res) => {
  const index = clients.findIndex((client) => client.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ msg: "Cliente não encontrado" });
  clients.splice(index, 1);
  res.status(204).send();
};
