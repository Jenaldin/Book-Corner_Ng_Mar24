const commentService = require('../services/commentService');

const getComments = async (req, res) => {
   try {
      let pageNumber = Number(req.query.start);
      const pageSize = Number(req.query.end);
      const bookId = req.query.bookId;
      const item = await commentService.getComments(pageNumber, pageSize, bookId);
   
      res.json({comments: item.comments, total: item.total});
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const newComment = async (req, res) => {
   const payloadData = req.body;
   const userId = req.user._id;

   try {
      await commentService.addNewComment(payloadData, userId);
      res.json({ message: 'Comment added successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const updateComment = async (req, res) => {
   const payloadData = req.body;
   const { commentId } = req.params;
   try {
      await commentService.editComment(commentId, payloadData);
      res.json({ message: 'Comment updated successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const removeComment = async (req, res) => {
   const { commentId } = req.params;
   try {
      await commentService.deleteComment(commentId);
      res.json({ message: 'Comment deleted successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const voteYes = async (req, res) => {
   const { commentId } = req.params;
   const user  = req.body.userId
   try {
      await commentService.commentVoteYes(commentId, user);
      res.json({ message: 'Comment voted Yes successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const voteNo = async (req, res) => {
   const { commentId } = req.params;
   const user = req.body.userId
   try {
      await commentService.commentVoteNo(commentId, user);
      res.json({ message: 'Comment voted No successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

module.exports = {
   getComments,
   voteYes,
   voteNo,
   newComment,
   updateComment,
   removeComment,
}