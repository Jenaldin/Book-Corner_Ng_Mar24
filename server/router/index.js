const router = require('express').Router();
const test = require('./test');
const book = require('./book');
const auth = require('./auth');
const comment = require('./comment');

router.use('/', test);
router.use('/catalog', book);
router.use('/user', auth);
router.use('/comment', comment);

module.exports = router;