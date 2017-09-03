var mongoose = require("mongoose");

// Thing Schema & Model Setup
var globalThingSchema = new mongoose.Schema({
  name: String,
  type: String
});

module.exports = mongoose.model("GlobalThing", globalThingSchema);
