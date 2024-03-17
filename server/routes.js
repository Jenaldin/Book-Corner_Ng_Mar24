const router = require('express').Router();

router.get('/', (req, res) => {
   res.send('You Shall Not Pass!!!');
});

router.get('*', (req, res) => {
   res.status(404).send(`Not All Who Wonder Are Lost...
      But in your case, you are lost, try the /api path, thanks!`);
 });

module.exports = router;