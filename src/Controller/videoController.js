let id = 1;
let videos = [
  {
    id,
    title: "example",
    createdAt: Date.now(),
    description: "first video",
    hashtags: ["1", "3"],
  },
];

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = (req, res) => {
  const { title, description, hashtags } = req.body;
  videos.push({
    id: ++id,
    title,
    createdAt: Date.now(),
    description,
    hashtags: hashtags.split(",").map((ele) => `#${ele}`),
  });
  return res.redirect("/");
};

export const deleteVideo = (req, res) => {
  const { id } = req.params;
  videos = videos.filter((video) => JSON.stringify(video.id) !== id);
  return res.redirect("/");
};

export const getEditVideo = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => JSON.stringify(video.id) === id);
  return res.render("editVideo", { video });
};

export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  videos[id - 1].title = title; // 업데이트
  videos[id - 1].description = description; // 업데이트
  videos[id - 1].hashtags = hashtags
    .split(",")
    .map((element) => (element.startsWith("#") ? element : `#${element}`));
  return res.redirect(`/video/${id}`);
};

export const videoDetail = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => JSON.stringify(video.id) === id);
  //객체 내부 id 와 req.params 의 타입이 달랐따! 문자열로 통일해서 검사하자!!!
  if (!video) {
    console.log("there is no video");
    return res.status(404);
  }
  return res.render("detail", { video });
};

export const search = (req, res) => {
  return res.render("search");
};

export const home = (req, res) => {
  return res.render("home", { videos });
};
