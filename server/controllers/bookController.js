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
};

const getLatestBooks = async (req, res) => {
   const items = await bookService.getLatestBooks().lean();
   res.send(items);
};

const getBook = async (req, res) => {
   const item = await bookService.getBook(req.params.bookId).lean();
   res.send(item);
};

const newBook = async (req, res) => {
   const payloadData = req.body;
   const ownerId = '65f6472be5ccc32c2bc27804';
   //const ownerId = req.user.id;
   try {
      await bookService.addNewBook(payloadData, ownerId);
      res.json({ message: 'Book added successfully' });
   } catch (err) {
      res.json({ message: `Failed to add book. Error:` + err })
   }
}


module.exports = {
   getBooks,
   getTotalBooks,
   getLatestBooks,
   getBook,
   newBook,
}
