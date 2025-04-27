import userRoutes from "../routes/userRoutes";
import express from "express";
import request from "supertest";

const authApp = express();
authApp.use(express.json());
authApp.use("/login", userRoutes);

describe("Auth API", () => {
  it("deve fazer login com usuário válido", async () => {
    const response = await request(authApp)
      .post("/login")
      .send({ email: "admin", password: "admin" });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("deve falhar com usuário inválido", async () => {
    const response = await request(authApp)
      .post("/login")
      .send({ email: "x", password: "x" });
    expect(response.statusCode).toBe(401);
  });
});
