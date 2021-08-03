export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = (req, res) => {};

export const deleteVideo = (req, res) => {
  return res.send("delete");
};

export const getEditVideo = (req, res) => {
  return res.render("editVideo");
};

export const postEditVideo = (req, res) => {};

export const videoDetail = (req, res) => {
  return res.render("detail");
};
