var mongoose = require("mongoose");

// Thing Schema & Model Setup
var thingSchema = new mongoose.Schema({
  name: String,
  purchaseDate: Date,
  purchasePrice: String,
  usageDates: Array
});

module.exports = mongoose.model("Thing", thingSchema);
