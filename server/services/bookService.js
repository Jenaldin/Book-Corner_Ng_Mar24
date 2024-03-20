const bookModel = require('../models/bookModel');

exports.getBooks = () => bookModel.find();