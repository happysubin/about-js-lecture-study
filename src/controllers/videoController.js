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
export const editVideo = (req, res) => {
  console.log(req.params);
  return res.render("editVideo");
};
export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
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
