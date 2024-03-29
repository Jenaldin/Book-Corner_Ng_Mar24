const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   content: {
      type: String,
      minlength: [1, 'Comment minimal length is 1 symbol'],
      maxlength: [500, 'Comment maximal length is 500 symbols'],
      required: [true, 'Comment content is required']
   },
   rating: {
      type: Number,
      min: [1, 'Rating minimal value is 1'],
      max: [5, 'Rating maximal value is 5'],
      required: false,
      default: 0,
   },
   helpfulYes: {
      type: Number,
      default: 0,
   },
   helpfulNo: {
      type: Number,
      default: 0,
   },
   votedHelpful: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
   }],
   gaveRating: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
   }],
   user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   book: {
      type: mongoose.Types.ObjectId,
      ref: 'Book',
   }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;