const { bookModel, userModel } = require('../models/index');

exports.getBooks = (startPage, endPage) => bookModel
   .find()
   .skip(startPage)
   .limit(endPage - startPage)
   .populate('owner', 'username');

exports.getTotalBooks = () => bookModel.countDocuments();

exports.getLatestBooks = () => bookModel
   .find()
   .sort({ createdDate: -1 })
   .limit(5)
   .populate('owner', 'username');

exports.getBook = (bookId) => bookModel.findById(bookId).populate('owner', 'username');

exports.addNewBook = async (payloadData, ownerId) => {
   const createdBook = await bookModel.create({
      ...payloadData,
      owner: ownerId,
   })
   return createdBook;
};

exports.editBook = async (bookId, payloadData) => bookModel.findByIdAndUpdate(bookId, payloadData, {runValidators: true});

exports.deleteBook = (bookId) => bookModel.findByIdAndDelete(bookId);