const commentService = require('../services/commentService');

const getComments = async (req, res) => {

};

const getTotalComments = async (req, res) => {
   
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