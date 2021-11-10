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
  login: (req, res, next) => {},
};
