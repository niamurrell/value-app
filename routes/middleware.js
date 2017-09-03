var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.session.redirectTo = req.originalUrl;
	req.flash("error", "You must be logged in to do that.");
  res.redirect("/login");
}


module.exports = middlewareObj;
