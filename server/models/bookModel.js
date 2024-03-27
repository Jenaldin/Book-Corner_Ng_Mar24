const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [2, 'Title minimal length is 2 symbols'],
      maxlength: [256, 'Language the book is in maximal length is 30 symbols'],
      required: [true, 'Title is required'],
   },
   author: {
      type: String,
      minlength: [2, 'Author`s name minimal length is 2 symbols'],
      maxlength: [256, 'Author`s name the book is in maximal length is 256 symbols'],
      required: [true, 'Author`s name is required'],
   },
   genre:{
      type: String,
      required: [true, 'Genre is required'],
   },
   coverUrl: {
      type: String,
      validate: {
         validator: function (value) {
            return validator.isURL(value) && /^https:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
         },
         message: 'Invalid cover link',
      },
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
   averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
   },
   createdDate: {
      type: Date,
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   isRented: {
      type: Boolean,
      default: false
   },
   requestedBy: [{
      user: {
         type: mongoose.Types.ObjectId,
         ref: 'User'
      },
      requestedOn: {
         type: Date,
         default: Date.now
      }
   }],
   comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comment'
   }]
});

bookSchema.pre('save', function () {
   if (!this.createdDate) {
      this.createdDate = Date.now();
   };
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;