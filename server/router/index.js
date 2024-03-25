const router = require('express').Router();
const test = require('./test');
const book = require('./book');
const auth = require('./auth');

router.use('/', test);
router.use('/catalog', book);
router.use('/user', auth);
//router.use('/comments', comment);

module.exports = router;