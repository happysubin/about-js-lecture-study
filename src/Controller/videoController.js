import User from "../Model/User";
import Video from "../Model/Video";

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const { path } = req.file;
  const { _id } = req.session.user;
  console.log(req.file);
  const newVideo = await Video.create({
    title,
    videoURL: path,
    description,
    owner: _id,
    hashtags: Video.formatHashtags(hashtags),
  });
  const user = await User.findById(_id);
  user.videos.push(newVideo._id); //아이디를 저장해야지 populate이 가능!!!!
  /* 여기에서 세션에 과연 비디오를 push 해야 할까? push하는 이유는 우리는 즉 profile에서 유저의 모든 동영상을 가져오려한다. 우리는 
  req.params.id 로 find해서 가져오는 것이지 세션에 관련해서 뭘 진행하는 것이 아니라 세션에 푸쉬할 이유가 없다.
  */
  user.save();
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
  const video = await Video.findById(id).populate("owner");
  console.log(video);
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
