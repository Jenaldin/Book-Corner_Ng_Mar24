const { bookModel, commentModel } = require('../models/index');

exports.getComments = async (pageNumber, pageSize, bookId) => {
   const comments = await commentModel
   .find({book: bookId})
   .sort({createdAt: -1})
   .skip(pageNumber)
   .limit(pageSize)
   .populate('user', 'username');

   const total = await commentModel.countDocuments({book: bookId});
   return { comments, total }
};

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

exports.getOne = async (commentId) => await commentModel.findOne(commentId)

exports.editComment = async (commentId, payloadData) => commentModel.findByIdAndUpdate(commentId, payloadData, { runValidators: true });

exports.deleteComment = async (commentId) => await commentModel.findByIdAndDelete(commentId);

exports.commentVoteYes = async (commentId, user) => {
   const comment = await commentModel.findById(commentId);
   const newVote = comment.helpfulYes + 1
   comment.helpfulYes = newVote;
   comment.usersVotedHelpful.push(user);
   await comment.save();
};

exports.commentVoteNo = async (commentId, user) => {
   const comment = await commentModel.findById(commentId);
   const newVote = comment.helpfulNo + 1
   comment.helpfulNo = newVote;
   comment.usersVotedHelpful.push(user);
   await comment.save();
};