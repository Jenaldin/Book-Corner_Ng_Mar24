const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
   if (err instanceof mongoose.MongooseError) {
      return Object.values(err.errors).at(0).message;
   } else if (err instanceof Error) {
      return err.message;
   }
};

// function errorHandler(err, req, res, next) {
//    if (err.status === 333) {
//        res.status(333)
//            .json({ message: 'ErrorHandler: not allowed!' })
//    } else {
//        console.error(err.stack)
//        // console.log(err)
//        res.status(500)
//            .json({ message: 'ErrorHandler: Something went wrong!', err })
//    }
// }

// module.exports = errorHandler;