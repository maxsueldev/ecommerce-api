import express from "express";

const app = express();
app.use(express.json());

// Routes

app.listen(3000, () => {
  console.log("API de e-commerce rodando na porta 3000");
});
