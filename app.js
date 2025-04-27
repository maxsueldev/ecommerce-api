import express from "express";
import clientRoutes from "./routes/clientRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/clients", clientRoutes);

app.listen(3000, () => {
  console.log("API de e-commerce rodando na porta 3000");
});
