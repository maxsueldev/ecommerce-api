import express from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", authenticate, authorize(["admin"]), createClient);
router.put("/:id", authenticate, authorize(["admin"]), updateClient);
router.delete("/:id", authenticate, authorize(["admin"]), deleteClient);

export default router;
