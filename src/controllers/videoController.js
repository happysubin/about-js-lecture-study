let videos = [
  {
    title: "Hello",
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Video #2",
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 2,
  },
  {
    title: "Whatsup",
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1]; // id를 이용해서 video를 찾는다. 배열 인덱스는 0 부터 시작 주의
  return res.render("see", { pageTitle: `watch ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  videos[id - 1].title = title; // 업데이트
  return res.redirect(`/videos/${id}`);
};

export const getEdit = (req, res) => {
  const { id } = req.params; //지금은 파라미터를 통해 비디오를 찾는다.
  const video = videos[id - 1];
  return res.render("editVideo", { pageTitle: `Edit ${video.title}`, video }); //obj로 보내는걸 주의
};

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
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
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
