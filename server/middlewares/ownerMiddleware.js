const bookService = require('../services/bookService');

exports.isBookOwner = async (req, res, next) => {
   const bookId = req.params.bookId
   const book = await bookService.getOne({ _id: bookId });
   if (!book) {
      return res.status(404).send();
    }
   if (book.owner.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to edit this book' });
   };
   req.book = book;
   next();
};