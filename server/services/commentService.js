const { bookModel, userModel, commentModel } = require('../models/index');

exports.addNewComment = async (payloadData, userId) => {
   const createdComment = await commentModel.create({
      ...payloadData,
      user: userId,
   })

   console.log('payloadData.book:', payloadData.book);
   const book = await bookModel.findById(payloadData.book);
   console.log("Initial book: " + book);
   
   if(createdComment.ratedBookWith > 0){
      if(book.usersWhoRated.includes(createdComment.user)){
         throw new Error('You have already rated this book, you cannot rate it again');
      }

      let totalRating = book.averageRating * book.usersWhoRated.length;
      totalRating += createdComment.ratedBookWith;
      book.usersWhoRated.push(createdComment.user);
      book.averageRating = totalRating / book.usersWhoRated.length;
      await book.save();
      console.log("Updated book: " + book)
   }

   return createdComment;
};