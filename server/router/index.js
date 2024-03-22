const router = require('express').Router();
const test = require('./test');
const book = require('./book');

const authController = require('../controllers/authController');
const { isGuest } = require('../middlewares/authMiddleware');

router.use('/', test);
router.use('/catalog', book);

router.post('/register', isGuest, authController.registerUser);

module.exports = router;