var express = require("express");
var router = express.Router();
var Thing = require("../models/thing.js");
var middleware = require("./middleware")

// Show All My Things
router.get("/", function(req, res) {
  res.render("mythings");
});


module.exports = router;
