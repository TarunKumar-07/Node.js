const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/demoDB");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  nicname: String,
  description: String,
  category: {
    type: Array,
    default: [],
  },
  creation: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", userSchema);
