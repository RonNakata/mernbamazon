const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now },
  departmentname: String,
  price: { type: Number, required: true},
  stockquantity: {type: Number, required: true},
  picture: { type: String, default: "http://apocalypsewriters.com/premadecovers4u/wp-content/uploads/2013/09/sample5.jpg" },
  productsales: { type: Number, default: 0 }
});


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
