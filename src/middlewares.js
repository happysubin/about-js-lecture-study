export const localmiddlewares = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.user = req.session.user;
  console.log(res.locals);
  next();
};
