import User from "../models/User";
export const edit = (req, res) => {
  res.send("Edit User");
};
export const deleteUser = (req, res) => {
  res.send("Delete");
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, username, email, password, location, password2 } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const see = (req, res) => {
  res.send("i see");
};
export const logout = (req, res) => {
  res.send("logout");
};
