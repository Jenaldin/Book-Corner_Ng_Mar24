const { bookModel, userModel } = require('../models/index');

exports.getBooks = (pageNumber, pageSize) => bookModel
   .find()
   .skip(pageNumber)
   .limit(pageSize)
   .populate('owner', 'username');

exports.getTotalBooks = () => bookModel.countDocuments();

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
         console.log("No user found");
        throw new Error('User not found');
      }
      let userIdString = user._id.toString();
      query.owner = userIdString;
    }

   return bookModel.find(query).populate('owner', 'username').lean();
};

exports.getBook = (bookId) => bookModel.findById(bookId).populate('owner', 'username');

exports.addNewBook = async (payloadData, ownerId) => {
   const createdBook = await bookModel.create({
      ...payloadData,
      owner: ownerId,
   })
   return createdBook;
};

exports.editBook = async (bookId, payloadData) => bookModel.findByIdAndUpdate(bookId, payloadData, { runValidators: true });

exports.deleteBook = (bookId) => bookModel.findByIdAndDelete(bookId);