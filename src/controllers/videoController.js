import Video from "../models/Video";

export const see = (req, res) => {
  const { id } = req.params;
  return res.render("see", { pageTitle: `watch ` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  return res.redirect(`/videos/${id}`);
};

export const getEdit = (req, res) => {
  const { id } = req.params; //지금은 파라미터를 통해 비디오를 찾는다.
  return res.render("editVideo", { pageTitle: `Edit` }); //obj로 보내는걸 주의
};

export const trending = (req, res) => {
  Video.find({}, (error, documents) => {
    res.render("home", { pageTitle: "Home", videos: [] });
  });
};

export const search = (req, res) => {
  res.send("search");
};

export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("delete video");
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;

  return res.redirect("/");
};
