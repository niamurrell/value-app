var mongoose = require("mongoose");

// Thing Schema & Model Setup
var thingSchema = new mongoose.Schema({
  // name: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "GlobalThing"
  // }],
  name: String,
  purchaseDate: Date,
  purchasePrice: String,
  usageDates: Array
});

module.exports = mongoose.model("Thing", thingSchema);
