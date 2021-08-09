import axios from "axios";
import bcrypt from "bcrypt";
import User from "../Model/User";
import dotenv from "dotenv";
dotenv.config();

export const profile = (req, res) => {
  return res.render("profile");
};

export const getChangepassword = (req, res) => {
  if (req.session.user.socialLogin) {
    return res.render("login", {
      errorMEssage: "this is social login. you can't change password",
    });
  }
  return res.render("changePassword");
};

export const postChangepassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { originPassword, changePassword, checkChangePassword },
  } = req;
  const user = await User.findById(_id);
  const check = await bcrypt.compare(originPassword, user.password);
  if (!check) {
    return res.render("changePassword", {
      errorMessage: "wrong origin password",
    });
  }
  if (changePassword !== checkChangePassword) {
    return res.render("changePassword", {
      errorMessage:
        "Two passwords (changepassword, check change password) are different.",
    });
  }

  user.password = changePassword;
  await user.save();
  console.log(req.session.user.password, user.password);
  return res.redirect("/user/logout");
};

export const getEditProfile = (req, res) => {
  return res.render("editProfile");
};

export const postEditProfile = async (req, res) => {
  const {
    session: {
      user: { _id, username: checkUsername, emial: checkEmail },
    },
    body: { username, name, location, email },
  } = req;

  const user = await User.exists({
    $or: [{ email }, { username }],
  });

  if (checkUsername === username || email === checkEmail) {
    return res.render("editProfile", {
      errorMessage: "There is no change.",
    });
  }
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
  req.session.destroy();
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
  await User.create({
    name,
    username,
    password,
    location,
    email,
  });
  return res.redirect("/login");
};

export const getGithub = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email", //우리가 data를 가져올수 있는 범위를 정한다
  };
  const param = new URLSearchParams(config).toString(); // url 에서 보이는 파라미터 형태로 나온다.
  const finalUrl = `${baseUrl}?${param}`;
  return res.redirect(finalUrl);
};

export const finalGithub = async (req, res) => {
  //axios.post("url",params,config(headers가 포함됨)) 이렇게 인자가 구성
  /*const data = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code: req.query.code,
      client_secret: process.env.CLIENT_SECRET,
      client_id: process.env.CLIENT_ID,
    },
    {
      Accept: "application/json",
    }
  ); 위 함수로도 가능하긴하다
  */
  const data = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code: req.query.code,
      client_secret: process.env.CLIENT_SECRET,
      client_id: process.env.CLIENT_ID,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  //const json = await data.json();
  const tokenReq = data.data;

  if ("access_token" in tokenReq) {
    const { access_token } = tokenReq;
    const user = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const { data: userData } = user;
    //console.log(userData);
    const email = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const { data: emailData } = email;
    const emailObj = emailData.find(
      (ele) => ele.primary === false && ele.verified === false
    );

    if (!emailObj) {
      return res.redirect("/login");
    }
    const userExists = await User.findOne({ email: emailObj.email });

    if (!userExists) {
      await User.create({
        name: userData.name,
        username: userData.login,
        socialLogin: true,
        password: "",
        location: userData.location,
        email: emailObj.email,
      });
    }
    req.session.loggedIn = true;
    req.session.user = userExists;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }

  //
};
