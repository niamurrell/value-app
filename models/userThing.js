var mongoose = require("mongoose");

// Thing Schema & Model Setup
var userThingSchema = new mongoose.Schema({
  globalThing: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "GlobalThing"
  }],
  purchaseDate: Date,
  purchasePrice: Number,
  usageDates: Array
});

module.exports = mongoose.model("UserThing", userThingSchema);


// exampleThing = {
//   GlobalThing: "3we7ryi77i3",
//   purchaseDate: 2017-03-22,
//   purchasePrice: 34.20,
//   usageDates: []
// }
