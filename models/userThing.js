var mongoose = require("mongoose");

// Thing Schema & Model Setup
var userThingSchema = new mongoose.Schema({
  name: String,
  purchaseDate: Date,
  purchasePrice: Number,
  currentValue: Number,
  usageDates: Array
});

// Set number of uses to calculate currentValue
userThingSchema.virtual("useCount").get(function() {
  return this.usageDates.length;
})

module.exports = mongoose.model("UserThing", userThingSchema);
