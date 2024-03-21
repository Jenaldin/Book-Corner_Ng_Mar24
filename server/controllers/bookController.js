const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorUtil');

const getBooks = async (req, res) => {
   try {
      const start = Number(req.query.startPage);
      const end = Number(req.query.endPage);
      const items = await bookService.getBooks().lean();
      res.send(items);
   } catch (err) {
      const error = getErrorMessage(err);
      if (err.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
   }
};

const getTotalBooks = async (req, res) => {
   try {
      const items = await bookService.getTotalBooks();
      res.send(items.toString());
   } catch (err) {
      const error = getErrorMessage(err);
      if (err.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
   }
};

const getLatestBooks = async (req, res) => {
   try {
      const items = await bookService.getLatestBooks().lean();
      res.send(items);
   } catch (err) {
      const error = getErrorMessage(err);
      if (err.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
   }
};

const getBook = async (req, res) => {
   try {
      const item = await bookService.getBook(req.params.bookId).lean();
      res.send(item);
   } catch (err) {
      const error = getErrorMessage(err);
      if (err.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
   }
};

const newBook = async (req, res) => {
   const payloadData = req.body;
   const ownerId = '65f6472be5ccc32c2bc27804';
   //const ownerId = req.user.id;
   try {
      await bookService.addNewBook(payloadData, ownerId);
      res.json({ message: 'Book added successfully' });
   } catch (err) {
      const error = getErrorMessage(err);
      if (err.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
   }
};

const updateBook = async (req, res) => {
   const payloadData = req.body;
   const { bookId } = req.params;
   try {
      await bookService.editBook(bookId, payloadData);
      res.json({ message: 'Book updated successfully' });
   } catch (err) {
      const error = getErrorMessage(err);
      if (err.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
   }
};

const removeBook = async (req, res) => {
   const { bookId } = req.params;
   try {
      await bookService.deleteBook(bookId);
      res.json({ message: 'Book deleted successfully' });
   } catch (err) {
      const error = getErrorMessage(err);
      if (err.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
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
