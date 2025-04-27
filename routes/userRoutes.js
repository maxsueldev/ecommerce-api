import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

// const express = express();
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
