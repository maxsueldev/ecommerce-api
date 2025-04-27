import { clients } from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

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
