import { validationResult } from "express-validator";
/*const obj={
    id: "1",
    text: "개발자 지망생들 파이팅!!!",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
    url: "",
  },*/
const validator = (req, res, next) => {
  const errors = validationResult(req); //errors obj를 전달받는다
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg }); //배열로 변환해서 첫번째 요소에 메세지를 보낸다
  } else {
    return next();
  }
};

export default validator;
