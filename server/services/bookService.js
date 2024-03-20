const {bookModel, userModel} = require('../models/index');

exports.getBooks = (startPage, endPage) => bookModel
   .find()
   .skip(startPage)
   .limit(endPage - startPage)
   .populate('owner', 'username');

exports.getTotalBooks = () => bookModel.countDocuments();

exports.getBook = (bookId) => bookModel.findById(bookId).populate('owner', 'username');