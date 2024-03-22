const router = require('express').Router();
const test = require('./test');
const book = require('./book')

router.use('/', test);
router.use('/catalog' || `/catalog?start=${start}&end=${end}`, book);


module.exports = router;