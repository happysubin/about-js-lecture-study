import User from "../models/User";
import Video from "../models/Video";

export const see = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (video) {
    return res.render("see", { pageTitle: video.title, video });
  } else
    return res.status(404).render("404", { pageTitle: "404! Video not found" });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video)
    return res.status(404).render("404", { pageTitle: "404! Video not found" });
  if (String(_id) !== String(video.owner)) {
    return res.status(403).redirect("/");
  }
  return res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
};

export const trending = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"), //regex는 몽고db에서 제공하는 옵션
      },
    }).populate("owner");
  }
  res.render("search", { pageTitle: "Search", videos });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
    file: { path: fileUrl },
  } = req;

  try {
    const newVideo = await Video.create({
      fileUrl,
      title,
      description,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

/* 이거랑 위에 코드랑 2가지 방법으로 저장가능. 위는 바로 저장. 아래는 객체 생성후 저장
  const video = new Video({
    title,
    description,
    hashTags: hashtags.split(",").map((word) => `#${word}`),
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  await video.save(); //이게 db에 저장 , 저장하는걸 기다려줘야하므로 await*/
