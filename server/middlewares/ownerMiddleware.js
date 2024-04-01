const bookService = require('../services/bookService');
const commentService = require('../services/commentService');
const authService = require('../services/authService');

exports.isBookOwner = async (req, res, next) => {
   const bookId = req.params.bookId
   const book = await bookService.getOne({ _id: bookId });
   if (!book) {
      return res.status(404).send();
    }
   if (book.owner.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to access this book' });
   };
   req.book = book;
   next();
};

exports.isProfileOwner = async (req, res, next) => {
   const userId = req.params.userId
   const user = await authService.getOne({ _id: userId });
   if (!user) {
      return res.status(404).send();
    }
   if (user._id.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to access this profile' });
   };
   req.user = user;
   next();
};

exports.isCommentOwner = async (req, res, next) => {
   const commentId = req.params.commentId
   const comment = await commentService.getOne({ _id: commentId });
   if (!comment) {
      return res.status(404).send();
    }
   if (comment.user.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to access this comment' });
   };
   req.comment = comment;
   next();
};