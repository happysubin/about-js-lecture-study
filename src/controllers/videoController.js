const fakeUser = {
  name: "samsung",
  loggedIn: true,
};

export const see = (req, res) => {
  return res.render("see");
};
export const editVideo = (req, res) => {
  console.log(req.params);
  return res.render("editVideo");
};
export const trending = (req, res) => {
  const videos = [
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
      views: 59,
      id: 1,
    },
    {
      title: "Whatsup",
      title: "Third Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
  ];
  res.render("home", { pageTitle: "Home", fakeUser, videos });
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
