var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var UserThing = require("../models/userThing.js");
var middleware = require("./middleware.js");
var moment = require("moment");

// All routes /mythings root

// Show All My Things
router.get("/", middleware.isLoggedIn, function(req, res) {
  var things = UserThing.find();
  User.findOne({username: req.user.username})
  .populate("things")
  .exec(function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log(user);
      res.render("mythings", {user: user, things: things, moment: moment});
    }
  })
});

// Submit form for a new thing
router.post("/", middleware.isLoggedIn, function(req, res) {
  User.findOne({username: req.user.username}, function (err, foundUser) {
    if (err) {
      console.log(err);
      req.flash("error", "Something went wrong!");
      res.redirect("/mythings");
    } else {
      var newThing = {
        name: req.body.name,
        purchaseDate: new Date(req.body.purchaseDate),
        purchasePrice: req.body.purchasePrice,
        currentValue: req.body.purchasePrice
      };
      UserThing.create(newThing, function(err, addedThing) {
        if (err) {
          console.log(err);
          req.flash("error", "Something went wrong!");
          res.redirect("/mythings");
        } else {
          addedThing.save();
          foundUser.things.push(addedThing);
          foundUser.save();
          req.flash("success", "Thing added!");
          res.redirect("/mythings");
        }
      });
    }
  });
});

// Form to create a new thing
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("things/new");
});

// Show a single Thing page
router.get("/:id", middleware.isLoggedIn, function(req, res) {
  UserThing.findById(req.params.id, function(err, foundThing) {
    if (err) {
      req.flash("error", "That thing does not exist!");
      res.redirect("/mythings");
    } else {
      res.render("things/show", {thing: foundThing, moment: moment});
    }
  });
});

// Edit a single Thing
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
  UserThing.findById(req.params.id, function(err, foundThing) {
    if (err) {
      req.flash("error", "That thing does not exist!");
      res.redirect("/mythings");
    } else {
      res.render("things/edit", {thing: foundThing, moment: moment});
    }
  });
});

// Update a single Thing
router.put("/:id", middleware.isLoggedIn, function(req, res) {
  UserThing.findByIdAndUpdate(req.params.id, req.body.thing, function(err, updatedThing) {
    if (err) {
      req.flash("error", "Something went wrong!");
      res.redirect("/mythings/:id");
    } else {
      req.flash("success", "Thing updated!");
      res.redirect("/mythings/" + req.params.id);
    }
  });
});

// Delete a single Thing
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
  UserThing.findByIdAndRemove(req.params.id, function(err, foundThing) {
    if (err) {
      req.flash("error", "Something went wrong!");
      res.redirect("/mythings/:id");
    } else {
      req.flash("success", "Thing deleted!");
      res.redirect("/mythings");
    }
  });
});

// Use a single Thing
router.get("/:id/use", middleware.isLoggedIn, function(req, res) {
  UserThing.findById(req.params.id, function(err, foundThing) {
    if (err) {
      req.flash("error", "Something went wrong!");
      res.redirect("/mythings");
    } else {
      res.render("things/use", {thing: foundThing});
    }
  });
});

// Add a use to a single Thing
router.put("/:id/use", middleware.isLoggedIn, function(req, res) {
  var addedUse = new Date(req.body.useDate);
  UserThing.findById(req.params.id, function (err, foundThing) {
    if (err) {
      req.flash("error", "Something went wrong!");
      res.redirect("/mythings/:id");
    } else {
      foundThing.usageDates.push(addedUse);
      foundThing.currentValue = foundThing.purchasePrice / foundThing.useCount;
      foundThing.save();
      req.flash("success", "Use added!");
      res.redirect("/mythings/" + req.params.id);
    }
  });
});

module.exports = router;
