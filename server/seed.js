const mongoose = require("mongoose");

const Book = require("./models/bookModel");
const User = require("./models/userModel");
const Comment = require("./models/commentModel");

let bookData = require("./seed/book-corner.books.json");
let userData = require("./seed/book-corner.users.json");
let commentData = require("./seed/book-corner.comments.json");

bookData = bookData.map(book => {
   book.usersWhoRated = book.usersWhoRated.map(user => new mongoose.Types.ObjectId(user.$oid));
   book.owner = new mongoose.Types.ObjectId(book.owner.$oid);
   book._id = new mongoose.Types.ObjectId(book._id.$oid);

   if (book.averageRating && book.averageRating.$numberDouble) {
      book.averageRating = Number(book.averageRating.$numberDouble);
   } else if (book.averageRating && book.averageRating.$numberInt) {
      book.averageRating = Number(book.averageRating.$numberInt);
   }
   if (book.__v && book.__v.$numberInt) {
      book.__v = Number(book.__v.$numberInt);
   }

   book.createdDate = new Date(Number(book.createdDate.$date.$numberLong));
   book.requestedBy = book.requestedBy.map(request => {
      request.user = new mongoose.Types.ObjectId(request.user.$oid);
      request._id = new mongoose.Types.ObjectId(request._id.$oid);
      request.requestedOn = new Date(Number(request.requestedOn.$date.$numberLong));
      return request;
   });

   return book;
});

userData = userData.map(user => {
   user.booksOwned = user.booksOwned.map(book => new mongoose.Types.ObjectId(book.$oid));
   user.booksRequested = user.booksRequested.map(book => new mongoose.Types.ObjectId(book.$oid));
   user._id = new mongoose.Types.ObjectId(user._id.$oid);

   if (user.__v && user.__v.$numberInt) {
      user.__v = Number(user.__v.$numberInt);
   }

   return user;
});

commentData = commentData.map(comment => {
   comment.usersVotedHelpful = comment.usersVotedHelpful.map(user => new mongoose.Types.ObjectId(user.$oid));
   comment.user = new mongoose.Types.ObjectId(comment.user.$oid);
   comment.book = new mongoose.Types.ObjectId(comment.book.$oid);
   comment._id = new mongoose.Types.ObjectId(comment._id.$oid);

   if (comment.ratedBookWith && comment.ratedBookWith.$numberInt) {
      comment.ratedBookWith = Number(comment.ratedBookWith.$numberInt);
   }
   if (comment.helpfulYes && comment.helpfulYes.$numberInt) {
      comment.helpfulYes = Number(comment.helpfulYes.$numberInt);
   }
   if (comment.helpfulNo && comment.helpfulNo.$numberInt) {
      comment.helpfulNo = Number(comment.helpfulNo.$numberInt);
   }
   if (comment.__v && comment.__v.$numberInt) {
      comment.__v = Number(comment.__v.$numberInt);
   }

   comment.createdAt = new Date(Number(comment.createdAt.$date.$numberLong));

   return comment;
});

mongoose
   .connect("mongodb://127.0.0.1:27017/book-corner", {
   })
   .then(() => {
      console.log("MongoDB successfully connected for seeding");
      return Promise.all([
         Book.deleteMany({}),
         User.deleteMany({}),
         Comment.deleteMany({}),
      ]);
   })
   .then(() => {
      return Promise.all([
         Book.insertMany(bookData),
         User.insertMany(userData),
         Comment.insertMany(commentData),
      ]);
   })
   .then(() => {
      console.log("Data import completed");
      process.exit();
   })
   .catch((error) => {
      console.error("Error while seeding data: ", error);
      process.exit();
   });
