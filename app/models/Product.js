const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
