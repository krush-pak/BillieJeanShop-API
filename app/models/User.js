const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registeredAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
