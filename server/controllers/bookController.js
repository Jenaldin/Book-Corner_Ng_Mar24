const router = require('express').Router();
const bookService = require('../services/bookService');

const getBooks = async (req, res) => {
   const items = await bookService.getBooks().lean();

   res.send(items);
};


module.exports = {
   getBooks,
}
