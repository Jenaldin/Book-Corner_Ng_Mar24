const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [5, 'Comment title minimal length is 10 symbol'],
      maxlength: [50, 'Comment title maximal length is 50 symbols'],
      required: [true, 'Comment title content is required']
   },
   commentBody: {
      type: String,
      minlength: [10, 'Comment message minimal length is 1 symbol'],
      maxlength: [1000, 'Comment message maximal length is 500 symbols'],
      required: [true, 'Comment message is required']
   },
   ratedBookWith: {
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
   usersVotedHelpful: [{
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