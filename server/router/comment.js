const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isCommentOwner } = require('../middlewares/ownerMiddleware')

router.get('/', isAuth, commentController.getComments);

router.post('/new', isAuth, commentController.newComment);
router.put('/:commentId', isCommentOwner, commentController.updateComment);
router.put('/voteYes/:commentId', isAuth, commentController.voteYes);
router.put('/voteNo/:commentId', isAuth, commentController.voteNo);
router.delete('/:commentId', isCommentOwner, commentController.removeComment);

module.exports = router