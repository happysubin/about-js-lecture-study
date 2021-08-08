import multer from "multer";

export const localMiddlewares = (req, res, next) => {
  res.locals.siteName = "SuTube";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
};

export const privateProtector = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const publicProtector = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const uploadVideo = multer({
  dest: "uploads/videos", //dest 말고 storage 도 있는 듯 하다.
  limits: {
    fileSize: 100000000,
  },
});
