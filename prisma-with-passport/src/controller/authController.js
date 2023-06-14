import passport from "passport";
import jwt from "jsonwebtoken";

import authService from "../service/authService";

export default {
  signup: async (req, res, next) => {
    const reqUser = {
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender,
      birth: req.body.birth,
    };

    await authService.signUp(reqUser);

    res.json({ success: true });
  },

  login: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) return res.status(400).json({ message: info });
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(400).json({
            message: "비밀번호와 메일을 확인하세요",
            user: user,
          });
        }
        const token = jwt.sign(user, process.env.SECRET_KEY);

        return res.json({ token });
      });
    })(req, res, next); //함수 호출
  },
};

//passport.authenticate() 미들웨어는 req.login()을 자동으로 호출한다.
