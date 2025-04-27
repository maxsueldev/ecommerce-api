import express from "express";
import {
  getAllSales,
  getSaleById,
  createSale,
  deleteSale,
} from "../controllers/saleController.js";

const router = express.Router();

router.get("/", getAllSales);
router.get("/:id", getSaleById);
router.post("/", createSale);
router.delete("/:id", deleteSale);

export default router;
