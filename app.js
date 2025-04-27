import express from "express";
import clientRoutes from "./routes/clientRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/clients", clientRoutes);
app.use("/sales", saleRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("API de e-commerce rodando na porta 3000");
});
