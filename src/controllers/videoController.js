export const see = (req, res) => {
  console.log(req.params);
  return res.send("Watch Video");
};
export const editVideo = (req, res) => {
  console.log(req.params);
  return res.send("Edit");
};
export const trending = (req, res) => {
  res.send("home page videos");
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
