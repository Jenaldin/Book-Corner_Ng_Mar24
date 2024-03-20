const bookService = require('../services/bookService');

const getBooks = async (req, res) => {
   const start = Number(req.query.startPage);
   const end = Number(req.query.endPage);
   const items = await bookService.getBooks().lean();
   res.send(items);
};

const getTotalBooks = async (req, res) => {
   const items = await bookService.getTotalBooks();
   res.send(items.toString());
}


module.exports = {
   getBooks,
   getTotalBooks,
}
