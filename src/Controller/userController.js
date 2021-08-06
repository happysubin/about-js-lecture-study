import bcrypt from "bcrypt";
import User from "../Model/User";

export const profile = (req, res) => {
  return res.render("profile");
};

export const getChangepassword = (req, res) => {
  return res.render("changePassword");
};

export const postChangepassword = (req, res) => {};

export const getEditProfile = (req, res) => {
  return res.render("editProfile");
};

export const postEditProfile = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { username, name, location, email },
  } = req;

  const user = await User.exists({
    email: { $ne: email },
    username: { $ne: username },
  });
  if (user) {
    return res.render("editProfile", {
      errorMessage: "That username or The email is in use.",
    });
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      username,
      name,
      location,
      email,
    },
    { new: true }
  );
  req.session.user = updateUser;
  res.redirect("/user/edit-profile");
};

export const deleteUser = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  await User.findOneAndDelete(_id);
  return res.send("delete");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getLogin = (req, res) => {
  return res.render("login");
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", { errorMessage: "There's no such user." });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.render("login", { errorMessage: "password is wrong" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const getSignup = (req, res) => {
  return res.render("signUp");
};

export const postSignup = async (req, res) => {
  const { name, username, password2, password, location, email } = req.body;
  const user = await User.exists({ username, email });
  if (user) {
    return res.render("signUp", {
      errorMessage: "That username or The email is in use.",
    });
  }
  if (password !== password2) {
    return res.render("signUp", {
      errorMessage: "Password 1 and password 2 do not match.",
    });
  }
  const newPassword = await bcrypt.hash(password, 10); //10 을 제일 많이 사용한다고 한다.
  await User.create({
    name,
    username,
    password: newPassword,
    location,
    email,
  });
  return res.redirect("/login");
};
