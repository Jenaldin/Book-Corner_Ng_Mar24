const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', bookController.getBooks);
router.get('/total', bookController.getTotalBooks);
router.get('/latest', bookController.getLatestBooks);
router.get('/:bookId', bookController.getBook);
//router.get('/search', bookController.searchBook);

router.post('/', isAuth, bookController.newBook);
router.put('/:bookId', isAuth, bookController.updateBook);
router.delete('/:bookId', isAuth, bookController.removeBook);


module.exports = router