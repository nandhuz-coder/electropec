const mongoose = require("mongoose");
passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    default: "null",
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    default: "null",
  },
  email: {
    type: String,
    required: true,
    default: "null",
  },
  password: {
    type: String,
    required: true,
    default: "null",
  },
  address: {
    type: String,
    required: true,
    default: "null",
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
