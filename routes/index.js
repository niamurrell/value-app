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
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome!");
      res.redirect("/mythings");
    });
  })
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
  }), function(req, res) {}
);

router.get("/myaccount", function(req, res) {
  res.render("myaccount");
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
