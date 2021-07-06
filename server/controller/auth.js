import jwt from "jsonwebtoken";

export const userLogin = (req, res) => {
  const { password, username } = req.body;
  console.log(password, username);
};

export const userSignup = (req, res) => {
  const { username, password, name, email, url } = req.body;
  console.log(username, password, name, email, url);
};
export const getUser = (req, res) => {};
