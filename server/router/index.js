const router = require('express').Router();
const test = require('./test');
const book = require('./book');

const authController = require('../controllers/authController');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.use('/', test);
router.use('/catalog', book);
//router.use('/profile', user);
//router.use('/comments', comment);

router.post('/register', isGuest, authController.registerUser);
router.post('/login', isGuest, authController.loginUser);
router.post('/logout', isAuth, authController.logoutUser);

module.exports = router;