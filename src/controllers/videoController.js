const fakeUser = {
  name: "samsung",
  loggedIn: true,
};

export const see = (req, res) => {
  return res.render("see");
};
export const editVideo = (req, res) => {
  console.log(req.params);
  return res.render("editVideo");
};
export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser });
};
export const search = (req, res) => {
  res.send("search");
};

export const upload = (req, res) => {
  res.send("upload");
};
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("delete video");
};
