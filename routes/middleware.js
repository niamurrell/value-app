var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.session.redirectTo = req.originalUrl;
	req.flash("error", "Please Log In!");
  res.redirect("/");
}


module.exports = middlewareObj;
