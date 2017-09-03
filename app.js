// LEFT OFF
// Set up persistent session
// Fix thing creation & routes to map to user
// Need to create view things page so it only shows this user's things

// Require Node Modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

// Require DB Models
var User = require("./models/user");
var Thing = require("./models/userThing");
var globalThing = require("./models/globalThing");


// Require Routes
var indexRoutes = require("./routes/index");
var thingsRoutes = require("./routes/things");
var globalThingsRoutes = require("./routes/globalThings");


// Implement Node Modules
var nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "development") {
  require('dotenv').config()
}
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
})

// Run app
app.use(indexRoutes);
app.use("/mythings", thingsRoutes);
app.use("/allthings", globalThingsRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("App running on port " + port);
});
