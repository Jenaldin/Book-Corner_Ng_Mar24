const { bookModel, userModel } = require('../models/index');
const mongoose = require('mongoose');

exports.getBooks = async (pageNumber, pageSize) => {
   const books = await bookModel
      .find()
      .skip(pageNumber)
      .limit(pageSize)
      .populate('owner', 'username');

   const total = await bookModel.countDocuments();
   return { books, total }
};

exports.getLatestBooks = () => bookModel
   .find()
   .sort({ createdDate: -1 })
   .limit(5)
   .populate('owner', 'username');

exports.search = async (title, author, genre, owner) => {
   let query = {};

   if (title) {
      query.title = new RegExp(title, 'i');
   };
   if (author) {
      query.author = new RegExp(author, 'i');
   };
   if (genre) {
      query.genre = genre;
   };

   if (owner) {
      const user = await userModel.findOne({ username: owner });
      if (!user) {
         throw new Error('User not found');
      }
      let userIdString = user._id.toString();
      query.owner = userIdString;
   }

   return bookModel.find(query).populate('owner', 'username').lean();
};

exports.getBook = async (bookId) => {
   try {
      const book = await bookModel.findById(bookId).populate('owner', 'username').populate('requestedBy.user', 'username')
      return book
   } catch (error) {
      const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
      if (!isValidObjectId(bookId)) {
         return 'Not a valid book id';
      }
   }
}

exports.getOne = async (bookId) => await bookModel.findOne(bookId)

exports.addNewBook = async (payloadData, ownerId) => {
   const createdBook = await bookModel.create({
      ...payloadData,
      owner: ownerId,
      usersWhoRated: [ownerId]
   })

   await userModel.findByIdAndUpdate(ownerId, { $push: { booksOwned: createdBook._id } });

   return createdBook;
};

exports.editBook = async (bookId, payloadData) => await bookModel.findByIdAndUpdate(bookId, payloadData, { runValidators: true });

exports.deleteBook = async (bookId) => await bookModel.findByIdAndDelete(bookId);

exports.requestBook = async (bookId, userId, isRented) => {
   const book = await bookModel.findById(bookId);
   book.requestedBy.push({ user: userId, requestedOn: Date.now() });
   await book.save();

   await bookModel.findByIdAndUpdate(bookId, { isRented: isRented }, { runValidators: true });
   await userModel.findByIdAndUpdate(userId, { $push: { booksRequested: bookId } });
};

exports.cancelReqBook = async (bookId, userId) => {
   await bookModel.updateOne({ _id: bookId }, { $pull: { requestedBy: { user: userId } } });
   await userModel.updateOne({ _id: userId }, { $pull: { booksRequested: bookId } });
}