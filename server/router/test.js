const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
   res.send(`<div><h3>Speak Friend And Enter!</h3></div>
   <div><h3><i>- Gandalf the Gray, Lord of the Rings, J.R.R. Tolkien</i></h3></div>
   <br>
   <div><h3>You have reached the test location, confirming that the API routes are functional.</h3></div>
   <div><h3>Please use the front-end application at http://localhost:4200</h3></div>`);
})

module.exports = router