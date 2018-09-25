var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.Promise = global.Promise; //clears deprecation warning

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  defaultCurrency: {
    type: String,
    minlength: 3,
    maxlength: 3
  },
  things: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserThing"
  }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
