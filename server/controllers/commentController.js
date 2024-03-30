const commentService = require('../services/commentService');

const getComments = async (req, res) => {
   try {
      let pageNumber = Number(req.query.start);
      const pageSize = Number(req.query.end);
      const items = await commentService.getComments(pageNumber, pageSize).lean();
      res.send(items);
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const getTotalComments = async (req, res) => {
   try {
      const items = await commentService.getTotalComments();
      res.send(items.toString());
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
   
};

module.exports = {
   getComments,
   getTotalComments,
   getComment,
   newComment,
   updateComment,
   removeComment,
}