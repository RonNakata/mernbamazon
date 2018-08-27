const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  buyer: { type: String, required: true },
  bookId: { type: String, required: true }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
