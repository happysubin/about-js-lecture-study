export const home = (req, res) => {
  return res.render("home");
};

export const getLogin = (req, res) => {
  return res.render("login");
};

export const postLogin = (req, res) => {};

export const getSignup = (req, res) => {
  return res.render("signUp");
};

export const postSignup = (req, res) => {};

export const search = (req, res) => {
  return res.render("search");
};
