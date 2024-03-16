const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [2, 'Title minimal length is 2 symbols'],
      required: [true, 'Title is required'],
   },
   genre:{
      type: String,
      minlength: [3, 'Genre minimal length is 3 symbols'],
      required: [true, 'Genre is required'],
   },
   coverUrl: {
      type: String,
      match: [/^https?:\/\//, 'Invalid cover link'],
      required: [true, 'Cover is required']
   },
   bookLang: {
      type: String,
      minlength: [2, 'Language the book is in minimal length is 2 symbols'],
      maxlength: [30, 'Language the book is in maximal length is 30 symbols'],
      required: [true, 'Language the book is in is required']
   },
   description: {
      type: String,
      minlength: [100, 'Description/Resume minimal length is 100 symbols'],
      maxlength: [2000, 'Description/Resume maximal length is 2000 symbols'],
      required: [true, 'Description/Resume is required']
   },
   yearPublished: {
      type: Number,
      required: [true, 'Year of publishing is required']
   },
   pagesLong:{
      type: Number,
      required: [true, 'Length in pages is required']
   },
   createdDate: {
      type: Date,
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   rentedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   rentedOn: {
      type: Date
   },
   leaseRequests: [{
      user: {
         type: mongoose.Types.ObjectId,
         ref: 'User'
      },
      requestedOn: {
         type: Date,
         default: Date.now
      }
   }],
   isRented: {
      type: Boolean,
      default: false
   }
});

bookSchema.pre('save', function () {
   if (!this.createdDate) {
      this.createdDate = Date.now();
   };
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;