// Require Node Modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

// Require DB Models
var User = require("./models/user");
var userThing = require("./models/userThing");

// Require Routes
var indexRoutes = require("./routes/index");
var thingsRoutes = require("./routes/things");
var userRoutes = require("./routes/user");

// Implement Node Modules
var nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "development") {
  require('dotenv').config()}

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

app.use(session({
  secret: 'process.env.SESSION_SECRET',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 7 * 24 * 60 * 60 // = 7 days
  })
}));

// Implement Passport for user authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user || null;
  next();
})

// Run app
app.use(indexRoutes);
app.use("/mythings", thingsRoutes);
app.use("/myaccount", userRoutes);
app.use(function(req, res) {
  res.render("404");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("App running on port " + port);
});
