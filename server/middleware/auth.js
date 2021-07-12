import jwt from "jsonwebtoken";
import * as userRepositories from "../model/User";

const Auth_Error = { message: "Authentication error" };

//모든 요청에 대해서 헤더에 Authorization이 있는지 검증
//이걸 통해 로그인한지 안한지 체크
export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader, "auth");
  //req 헤더안에 Authorization 이라는 키의 value를 가져온다
  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    console.log("hi");
    return res.status(401).json(Auth_Error);
  }
  const token = authHeader.split(" ")[1]; //Bearer 이후 값을 가져와서 인덱스가 1. 띄어쓰기 주의하자
  console.log("token : ", token);
  jwt.verify(token, "1q2w3e4r!@#$%^&*1", async (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(402).json(Auth_Error);
    }
    console.log(decoded.id);
    const user = await userRepositories.findById(decoded.id);
    console.log(user);
    if (!user) {
      return res.status(403).json(Auth_Error);
    }
    req.userId = user.id; //req.customData
    next();
  });
};
