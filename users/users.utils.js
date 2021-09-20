import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) return null; //계정이 없는 경우
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    console.log(user);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
