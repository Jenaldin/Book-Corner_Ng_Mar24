const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
   res.send(`<div><h3>Speak Friend And Enter!</h3></div>
   <div><h3>You have made it to the test location, the API routes work!</h3></div>`);
})

module.exports = router