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


const getComment = async (req, res) => {
   
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
   
};

const removeComment = async (req, res) => {
   const { commentId } = req.params;
   try {
      console.log(commentId);
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

module.exports = {
   getComments,
   getComment,
   newComment,
   updateComment,
   removeComment,
}