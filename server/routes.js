const router = require('express').Router();

router.get('/', (req, res) => {
   res.send('Server works!');
});

// router.get('*', (req, res) => {
//    res.status(404).send('Not Found');
//  });

module.exports = router;