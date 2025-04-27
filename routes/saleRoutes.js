import express from "express";
import {
  listSales,
  getAllSales,
  getSaleById,
  getAnalysis,
  createSale,
  deleteSale,
} from "../controllers/saleController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllSales);
router.get("/list", listSales);
router.get("/:id", getSaleById);
router.get("/sales/analysis", getAnalysis);
router.post("/", authenticate, authorize(["admin"]), createSale);
router.delete("/:id", authenticate, authorize(["admin"]), deleteSale);

export default router;
