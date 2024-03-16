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
   },
   user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;