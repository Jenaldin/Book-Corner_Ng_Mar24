const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
   res.send(`Speak Friend And Enter!
   You have made it to the test location, the API routes work!`);
})

module.exports = router