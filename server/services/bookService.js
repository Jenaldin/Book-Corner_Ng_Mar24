const bookModel = require('../models/bookModel');

exports.getBooks = () => bookModel.find();
console.log(bookModel.find());