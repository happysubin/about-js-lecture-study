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
  await Video.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
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
  return res.redirect("/");
};
