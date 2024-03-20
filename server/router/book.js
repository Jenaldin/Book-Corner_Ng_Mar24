const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.get('/total', bookController.getTotalBooks);
router.get('/:bookId', bookController.getBook);

module.exports = router