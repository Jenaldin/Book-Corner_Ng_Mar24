const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/new', isAuth, commentController.newComment);

module.exports = router