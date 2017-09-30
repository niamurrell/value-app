var mongoose = require("mongoose");

// Thing Schema & Model Setup
var userThingSchema = new mongoose.Schema({
  name: String,
  purchaseDate: Date,
  purchasePrice: Number,
  usageDates: Array
});

module.exports = mongoose.model("UserThing", userThingSchema);
