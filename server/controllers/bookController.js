const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorUtil');

const getBooks = async (req, res) => {
   try {
      let pageNumber = Number(req.query.start);
      const pageSize = Number(req.query.end);
      const items = await bookService.getBooks(pageNumber, pageSize).lean();
      res.send(items);
   } catch (err) {
      const error = getErrorMessage(err);
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   }
};

const getTotalBooks = async (req, res) => {
   try {
      const items = await bookService.getTotalBooks();
      res.send(items.toString());
   } catch (err) {
      const error = getErrorMessage(err);
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   }
};

const getLatestBooks = async (req, res) => {
   try {
      const items = await bookService.getLatestBooks().lean();
      res.send(items);
   } catch (err) {
      const error = getErrorMessage(err);
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   }
};

const getBook = async (req, res) => {
   try {
      const item = await bookService.getBook(req.params.bookId).lean();
      res.send(item);
   } catch (err) {
      const error = getErrorMessage(err);
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   }
};

const newBook = async (req, res) => {
   const payloadData = req.body;
   const ownerId = req.user.id;
   try {
      await bookService.addNewBook(payloadData, ownerId);
      res.json({ message: 'Book added successfully' });
   } catch (err) {
      const error = getErrorMessage(err);
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
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
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
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
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
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
