var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    defaultCurrency: req.body.defaultCurrency
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome!");
      res.redirect("/");
    });
  })
});

router.get("/login", function(req, res) {
  res.render("login", {
    user : req.user,
    error : req.flash("error")
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash : { type: "error", message: "Invalid username or password! Please try again." }
  }), function(req, res) {}
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
