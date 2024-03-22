const bcrypt = require('bcrypt');

const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtil');

const registerUser = async (req, res) => {
   const userData = req.body;
   try {
      const token = await authService.register(userData);
      res.cookie('auth', token);
      res.status(200).json({ message: 'Registration successful' });
   } catch (err) {
      const error = getErrorMessage(err);
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   };
};

module.exports = {
   registerUser,
}