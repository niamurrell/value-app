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

// Fix purchasePrice to 2 decimal places
userThingSchema.path("purchasePrice").get(function(num) {
  return (num).toFixed(2);
});

// Fix currentValue to 2 decimal places
userThingSchema.path("currentValue").get(function(num) {
  return (num).toFixed(2);
});

module.exports = mongoose.model("UserThing", userThingSchema);
