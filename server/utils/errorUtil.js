const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
   if (err instanceof mongoose.MongooseError) {
      return Object.values(err.errors).at(0).message;
   } else if (err instanceof Error) {
      return err.message;
   }
};