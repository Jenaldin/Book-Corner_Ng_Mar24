const router = require('express').Router();
const test = require('./test');
const book = require('./book')

router.use('/', test);
router.use('/catalog', book);

module.exports = router;