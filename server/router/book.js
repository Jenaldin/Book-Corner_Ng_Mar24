const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', bookController.getBooks);
router.get('/total', bookController.getTotalBooks);
router.get('/latest', bookController.getLatestBooks);
router.get('/search', bookController.searchBook);
router.get('/:bookId', bookController.getBook);

router.post('/', isAuth, bookController.newBook);
router.put('/:bookId', isAuth, bookController.updateBook);
router.delete('/:bookId', isAuth, bookController.removeBook);
router.put('/requestSub/:bookId', isAuth, bookController.requestSub);
router.put('/cancelSub/:bookId', isAuth, bookController.cancelSub);

module.exports = router