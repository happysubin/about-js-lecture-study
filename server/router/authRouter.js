import express from "express";
import { userSignup, userLogin, getUser } from "../controller/auth";
import { body, validationResult } from "express-validator";
import validator from "../middleware/validator";

const authRouter = express.Router();
const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("passwor should be at least 5 characters"),
  validator,
];

const validateSignup = [
  ...validateLogin,
  body("name").notEmpty().withMessage("name is missing"),
  body("url").isURL().withMessage("invalid URL"),
  body("email").isEmail().withMessage("invalid email"),
  validator,
];

authRouter.post("/login", validateLogin, userLogin);
authRouter.post("/signUp", validateSignup, userSignup);
authRouter.get("/me", getUser);

export default authRouter;
