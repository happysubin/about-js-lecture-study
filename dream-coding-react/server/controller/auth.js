import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepositories from "../model/User";
import { config } from "../config";

export const userLogin = async (req, res) => {
  const { password, username } = req.body;
  const user = await userRepositories.findByUsername(username);

  if (!user) {
    return res.status(401).json({ messageL: "Invalid user or paasword" });
  }
  const check = await bcrypt.compare(password, user.password); //앞에는 비번 뒤에는 해쉬되어서 디비에 저장된 비밀번호
  if (!check) {
    return res.status(401).json({ messageL: "Invalid user or paasword" });
  }
  const token = createJWTToken(user.id);
  return res.status(200).json({ token, username });
};

export const userSignup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const found = await userRepositories.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} is already exists` });
  }
  const hashed = await bcrypt.hash(
    password,
    parseInt(config.bcrypt.saltRounds)
  );
  const userId = await userRepositories.creatUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJWTToken(userId);
  console.log(token);
  return res.status(200).json({ token, username });
};

export const getUser = async (req, res) => {
  //토큰이 유효한지 유효하지 않은 지 체크
  const user = await userRepositories.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
};

function createJWTToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: parseInt(config.jwt.expiresSec),
  });
}
