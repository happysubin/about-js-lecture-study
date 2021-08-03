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

export const postEditProfile = (req, res) => {};

export const deleteUser = (req, res) => {
  return res.send("delete");
};

export const logout = (req, res) => {
  return res.send("logout");
};
