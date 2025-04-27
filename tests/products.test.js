import request from "supertest";
import express from "express";
import productRoutes from "../routes/productRoutes";

const app = express();

app.use(express.json());
app.use("/products", productRoutes);

describe("Produtos API", () => {
  it("deve adicionar um produto", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Produto Teste", price: 100 });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Produto Teste");
  });

  it("deve listar produtos", async () => {
    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.items)).toBeTruthy();
  });
});
