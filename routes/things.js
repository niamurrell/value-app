var express = require("express");
var router = express.Router();
var Thing = require("../models/userThing.js");
var globalThing = require("../models/globalThing.js");
var middleware = require("./middleware.js");

// Show All My Things
router.get("/", middleware.isLoggedIn, function(req, res) {
  // User.findOne(req.body.user!!).populate("things").exec(function(err, user) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(user);
  //   }
  // })
  Thing.find({}, function(err, myThings) {
    if(err) {
      console.log(err);
    } else {
      res.render("mythings", {myThings: myThings});
    }
  })
});

// Submit form for a new thing
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = decodeURIComponent(req.query.name);
  var purchaseDate = req.body.purchaseDate;
  var purchasePrice = req.body.purchasePrice;
  var newThing = {name: name, purchaseDate: purchaseDate, purchasePrice: purchasePrice};
  Thing.create(newThing, function(err, addedThing) {
    if (err) {
      console.log(err);
    } else {
      // User.findOne({current user}, function (err, foundUser) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     foundUser.things.push(newThing);
      //   }
      // })
      req.flash("success", "Thing added!");
      res.redirect("mythings");
    }
  });
})

// Form to create a new thing
router.get("/new", function(req, res) {
  var newThingName = req.query.name;
  res.render("things/new", {newThingName: newThingName});
})

// Show a single Thing page
router.get("/:id", function(req, res) {
  Thing.findById(req.params.id, function(err, foundThing) {
    if (err) {
      console.log(err);
      res.redirect("mythings");
    } else {
      res.render("things/show", {thing: foundThing});
    }
  })
})

// Edit a single Thing
router.get("/:id/edit", function(req, res) {
  Thing.findById(req.params.id, function(err, foundThing) {
    if (err) {
      console.log(err);
      res.redirect("mythings");
    } else {
      res.render("things/edit", {thing: foundThing});
    }
  })
});

// Update a single Thing
router.put("/:id", function(req, res) {
  Thing.findByIdAndUpdate(req.params.id, req.body.thing, function(err, updatedThing) {
    if (err) {
      res.redirect("mythings");
    } else {
      req.flash("success", "Thing updated!");
      res.redirect("/mythings/" + req.params.id);
    }
  })
});

// Use a single Thing
router.get("/:id/use", function(req, res) {
  Thing.findById(req.params.id, function(err, foundThing) {
    if (err) {
      console.log(err);
      res.redirect("mythings");
    } else {
      res.render("things/use", {thing: foundThing});
    }
  })
});

// Add a use to a single Thing
router.put("/:id/use", function(req, res) {
  // var addedUse = req.body.use;
  // User.findOne({current user}, function (err, foundUser) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     foundUser.things[usageDates].push(addedUse);
  //   }
  // })
  Thing.findByIdAndUpdate(req.params.id, req.body.use, function(err, addedUse) {
    if (err) {
      console.log(err);
      // res.redirect somewhere
    } else {
      req.flash("success", "Use added!");
      res.redirect("/mythings/" + req.params.id);
    }
  })
})



module.exports = router;
