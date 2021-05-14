import Video from "../models/Video";

export const see = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("see", { pageTitle: video.title, video });
  } else return res.render("404", { pageTitle: "404! Video not found" });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  return res.redirect(`/videos/${id}`);
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) return res.render("404", { pageTitle: "404! Video not found" });
  else
    return res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
};

export const trending = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
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

export const postUpload = async (req, res) => {
  const { title, hashtags, description } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
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
