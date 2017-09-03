var express = require("express");
var router = express.Router();
var Thing = require("../models/thing.js");
var middleware = require("./middleware")

// Show All My Things
router.get("/", function(req, res) {
  Thing.find({}, function(err, myThings) {
    if(err) {
      console.log(err);
    } else {
      res.render("mythings", {myThings: myThings});
    }
  })
});

// Submit form for a new thing
router.post("/", function(req, res) {
  var name = req.body.name;
  var purchaseDate = req.body.purchaseDate;
  var purchasePrice = req.body.purchasePrice;
  var newThing = {name: name, purchaseDate: purchaseDate, purchasePrice: purchasePrice};
  Thing.create(newThing, function(err, addedThing) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Thing added!");
      res.redirect("mythings");
    }
  });
})

// Form to create a new thing
router.get("/new", function(req, res) {
  res.render("things/new");
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
      res.redirect("/mythings/" + req.params.id)
    }
  })
});



module.exports = router;
