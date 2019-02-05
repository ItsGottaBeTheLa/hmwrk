module.exports = function(req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }
  return res.redirect("/");
};
