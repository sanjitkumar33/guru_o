const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  com_name: String,
});

module.exports = mongoose.model("User", UserSchema);
