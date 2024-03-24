const router = require('express').Router();

router.get('/', (req, res) => {
   res.send(`<h3>You Shall Not Pass!!!</h3>`);
});

router.get('*', (req, res) => {
   res.status(404).send(`<div><h3>Not All Who Wonder Are Lost...</h3></div>
   <div><h3>But in your case, you are lost, try another path.</h3></div>
   <div><h3>Or better, use app FE at http://localhost:4200, thanks!</h3></div>`);
 });

module.exports = router;