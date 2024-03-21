const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorUtil');

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
};

const updateBook = async (req, res) => {
   const payloadData = req.body;
   const { bookId } = req.params;

   try {
      await bookService.editBook(bookId, payloadData);
      res.json({ message: 'Book updated successfully' });
   } catch (err) {
      res.json({ message: `Failed to update book. Error:`,  error: getErrorMessage(err) });
   }
};

const removeBook = async (req, res) => {
   const { bookId } = req.params;

   try {
      await bookService.deleteBook(bookId);
      res.json({ message: 'Book deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: `Failed to delete book. Error: ${err}` });
   }
};

module.exports = {
   getBooks,
   getTotalBooks,
   getLatestBooks,
   getBook,
   newBook,
   updateBook,
   removeBook,
}
