import express from "express";
import clientRoutes from "./routes/clientRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/clients", clientRoutes);
app.use("/sales", saleRoutes);

app.listen(3000, () => {
  console.log("API de e-commerce rodando na porta 3000");
});
