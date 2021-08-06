export const localMiddlewares = (req, res, next) => {
  res.locals.siteName = "SuTube";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
};
