const { bookModel, userModel, commentModel } = require('../models/index');

exports.getComments = async (pageNumber, pageSize, bookId) => {
   const comments = await commentModel
   .find({book: bookId})
   .skip(pageNumber)
   .limit(pageSize)
   .populate('user', 'username');

   const total = await commentModel.countDocuments({book: bookId});
   return { comments, total }
}

exports.addNewComment = async (payloadData, userId) => {
   const createdComment = await commentModel.create({
      ...payloadData,
      user: userId,
   })

   const book = await bookModel.findById(payloadData.book);
   
   if(createdComment.ratedBookWith > 0){
      if(book.usersWhoRated.includes(createdComment.user)){
         throw new Error('You have already rated this book, you cannot rate it again');
      }

      let totalRating = book.averageRating * book.usersWhoRated.length;
      totalRating += createdComment.ratedBookWith;
      book.usersWhoRated.push(createdComment.user);
      book.averageRating = totalRating / book.usersWhoRated.length;
      await book.save();
   }

   return createdComment;
};

exports.deleteComment = (commentId) => commentModel.findByIdAndDelete(commentId);