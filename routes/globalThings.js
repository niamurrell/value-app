var express = require("express");
var router = express.Router();
var Thing = require("../models/userThing.js");
var globalThing = require("../models/globalThing.js");
var middleware = require("./middleware")

// Show All Global Things
router.get("/", function(req, res) {
  res.render("allthethings");
});

// Submit form for a new GLOBAL thing
router.post("/", function(req, res) {
  var newGlobalThing = {name: req.body.name};
  globalThing.create(newGlobalThing, function(err, addedGlobalThing) {
    if (err) {
      console.log(err);
    } else {
      var newThingName = encodeURIComponent(req.body.name);
      res.redirect("/mythings/new/?name=" + newThingName);
    }
  });
})

module.exports = router;
