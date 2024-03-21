const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.get('/total', bookController.getTotalBooks);
router.get('/latest', bookController.getLatestBooks);
router.get('/:bookId', bookController.getBook);

router.post('/', bookController.newBook);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.removeBook);


module.exports = router