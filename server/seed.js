const mongoose = require("mongoose");

const Book = require("./models/bookModel");
const User = require("./models/userModel");
const Comment = require("./models/commentModel");

const bookData = require("./seed/book-corner.books.json");
const userData = require("./seed/book-corner.users.json");
const commentData = require("./seed/book-corner.comments.json");

mongoose
   .connect("mongodb://127.0.0.1:27017/book-corner", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
