import express from "express";
import {
  getAllSales,
  getSaleById,
  createSale,
  deleteSale,
} from "../controllers/saleController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllSales);
router.get("/:id", getSaleById);
router.post("/", authenticate, authorize(["admin"]), createSale);
router.delete("/:id", authenticate, authorize(["admin"]), deleteSale);

export default router;
