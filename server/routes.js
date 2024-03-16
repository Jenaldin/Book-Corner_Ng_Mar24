const router = require('express').Router();

router.all('*', (req, res) => {
   res.render('404');
});

module.exports = router;