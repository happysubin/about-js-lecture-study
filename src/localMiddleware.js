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
