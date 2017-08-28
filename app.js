// Require Node Modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Require DB Models


// Require Routes
var indexRoutes = require("./routes/index");

// Implement Node Modules
var nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "development") {
  require('dotenv').config()
}
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


// Run app
app.use(indexRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("App running on port " + port);
});
