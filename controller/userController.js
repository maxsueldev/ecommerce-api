import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let users = [];
let id = 1;
const SECRET = "secret123";

const registerUser = async (req, res) => {
  const { name, email, password, carree } = req.body;

  const exist = users.find((u) => u.email === email);
  if (exist) return res.status(400).send("Usuário já existe");

  const hash = await bcrypt.hash(password, 10);
  const user = { id: id++, name, email, password: hash, carree };
  users.push(user);
  res.status(201).json({ id: user.id, email: user.email, carree: user.carree });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).send("Usuário não encontrado");

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) return res.status(401).send("Senha incorreta");

  const token = jwt.sign({ id: user.id, carree: user.carree }, SECRET, {
    expiresIn: "2h",
  });
  res.json({ token });
};

export { registerUser, loginUser };
