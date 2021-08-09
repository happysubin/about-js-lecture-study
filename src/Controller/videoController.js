import Video from "../Model/Video";

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const { path } = req.file;
  console.log(req.file);
  await Video.create({
    title,
    videoURL: path,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json("no video");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json("no video");
  }

  return res.render("editVideo", { video });
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json("no video");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/video/${id}`);
};

export const videoDetail = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    console.log("there is no video");
    return res.status(404);
  }
  return res.render("detail", { video });
};

export const search = async (req, res) => {
  const { searchTerm } = req.query;
  const videos = await Video.find({ title: searchTerm });
  console.log(videos);
  return res.render("search", { videos });
};

export const home = async (req, res) => {
  const videos = await Video.find();
  console.log(videos);
  return res.render("home", { videos });
};
