import saleRouter from "../routes/saleRoutes";
import express from "express";

const salesApp = express();
salesApp.use(express.json());
salesApp.use("/sales", saleRouter);

describe("Vendas API", () => {
  it("deve registrar uma nova venda", async () => {
    const response = await request(salesApp)
      .post("/sales")
      .send({
        itens: [
          { name: "Produto A", quantity: 2, price: 50 },
          { name: "Produto B", quantity: 1, price: 100 },
        ],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.itens.length).toBe(2);
  });

  it("deve realizar análise de vendas", async () => {
    const response = await request(salesApp)
      .get("/sales/analysis")
      .query({ initiation: "2020-01-01", end: "2030-01-01" });
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.incomeTotal).toBe("number");
  });
});
