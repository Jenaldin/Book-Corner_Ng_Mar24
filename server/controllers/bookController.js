const bookService = require('../services/bookService');

const getBooks = async (req, res) => {
   try {
      let pageNumber = Number(req.query.start);
      const pageSize = Number(req.query.end);
      const items = await bookService.getBooks(pageNumber, pageSize).lean();
      res.send(items);
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const getTotalBooks = async (req, res) => {
   try {
      const items = await bookService.getTotalBooks();
      res.send(items.toString());
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const getLatestBooks = async (req, res) => {
   try {
      const items = await bookService.getLatestBooks().lean();
      res.send(items);
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const getBook = async (req, res) => {
   try {
      const item = await bookService.getBook(req.params.bookId);
      res.send(item);
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const searchBook = async (req, res) => {
   try {
      const { title, author, genre, owner } = req.query;
      const items = await bookService.search(title, author, genre, owner);
      res.send(items);
   } catch (err) {
      const errMsg = err.message;
      if (errMsg === 'User not found') {
         res.status(404).json({ message: errMsg });
      } else if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const newBook = async (req, res) => {
   const payloadData = req.body;
   const ownerId = req.user._id;

   try {
      await bookService.addNewBook(payloadData, ownerId);
      res.json({ message: 'Book added successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
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
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const removeBook = async (req, res) => {
   const { bookId } = req.params;
   try {
      await bookService.deleteBook(bookId);
      res.json({ message: 'Book deleted successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
};

const requestSub = async (req, res) => {
   const { bookId } = req.params;
   const { userId, isRented } = req.body;

   try {
      await bookService.requestBook(bookId, userId, isRented);
      res.json({ message: 'Successfully requested book' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
}

const cancelSub = async (req, res) => {
   const { bookId } = req.params;
   const { userId } = req.body;
   try {
      await bookService.cancelReqBook(bookId, userId);
      res.json({ message: 'Successfully cancelled book request' });
      console.log('Successfully cancelled book request');
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   }
}

module.exports = {
   getBooks,
   getTotalBooks,
   getLatestBooks,
   getBook,
   searchBook,
   newBook,
   updateBook,
   removeBook,
   requestSub,
   cancelSub
}
