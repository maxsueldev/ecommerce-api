import jwt from "jsonwebtoken";

const SECRET = "secret123";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Token não fornecido");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Token inválido");
  }
};

const authorize = (permittedCarrees) => {
  return (req, res, next) => {
    if (!permittedCarrees.includes(req.user.carree)) {
      return res.status(403).send("Acesso negado");
    }
    next();
  };
};

export { authenticate, authorize };
