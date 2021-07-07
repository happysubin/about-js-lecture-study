import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepositories from "../model/User";

const jwtSecretKey = "1q2w3e4r!@#$%^&*1(";
const jwtExpireDays = "2d";
const bcryptRounds = 12;

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
  const hashed = await bcrypt.hash(password, bcryptRounds);
  const user = await userRepositories.creatUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJWTToken(user);
  return res.status(200).json({ token, username });
};

export const getUser = (req, res) => {};

function createJWTToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpireDays });
}
