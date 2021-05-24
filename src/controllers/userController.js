import User from "../models/User";
import brcypt from "bcrypt";
import fetch from "node-fetch";
import session from "express-session";
import { token } from "morgan";

export const getEdit = (req, res) => {
  res.render("edit-profile", { pageTitle: "Edit profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;
  console.log(file);
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists)
    return res.status(400).render("edit-profile", {
      pageTitle: "Edit profile",
      errorMessage: "This username/email is already taken",
    });

  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    {
      new: true,
    }
  );
  req.session.user = updateUser;
  return res.redirect("/users/edit");
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
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  return res.render("profile", { pageTitle: `${user.name} Profile`, user });
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { password, username } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
  const pageTitle = "Login";
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await brcypt.compare(password, user.password); //입력된 해시값으로 db에 저장된해시값과 비교
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  //req.session obj에 정보를 추가하는 중~
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};

export const finalGithubLogin = async (req, res) => {
  const baseURL = "https://github.com/login/oauth/access_token";
  const config = {
    // base url 에 포스트할때 config obj안에 파라미터값들이 필요. url과 파라미터!
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(emailData);
    const emailObj = emailData.find(
      (email) => email.primary === false && email.verified === false
    );

    if (!emailObj) {
      return res.redirect("/login");
    }

    let user = await User.findOne({
      email: emailObj.email,
    });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        location: userData.location,
        socialOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const getChangepassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    res.redirect("/");
  }
  return res.render("change-password", { pageTitle: "Change PassWord" });
};

export const postChangepassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { newPassword, oldPassword, newPasswordConfirmation },
  } = req;
  if (newPassword != newPasswordConfirmation) {
    return res.status(400).render("change-password", {
      pageTitle: "Change PassWord",
      errorMessage: "The password does not match the confirmation",
    });
  }
  const user = await User.findById(_id);
  const ok = await brcypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  console.log(newPassword, user.password, req.session.user.password);
  user.password = newPassword;
  await user.save();
  console.log(user.password, req.session.user.password);
  return res.redirect("/users/logout");
};
//세션에서 id,비밀번호를 가져와서 비밀번호 업데이트가능.그러나 이때는 세션의 비밀번호도 db의 비밀번호도 바꿔야함
