var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.Promise = global.Promise; //clears deprecation warning

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  things: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thing"
  }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
