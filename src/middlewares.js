import multer from "multer";
export const localmiddlewares = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.user = req.session.user;

  next();
};

export const protectorMiddleware = (req, ress, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadAvatar = multer({
  dest: "uploads/avatars",
  limits: {
    fileSize: 30000000,
  },
});
export const uploadVideo = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 100000000,
  },
});
