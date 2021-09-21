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

//함수를 인자로 받음 그리고 그 함수에 대한 것을 정의하는거임 함수안 함수
export const protectedResolvers =
  (ourResolvers) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolvers(root, args, context, info);
  };

/*
export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
}
*/
