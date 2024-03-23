const authService = require('../services/authService');

const registerUser = async (req, res) => {
   const userData = req.body;
   try {
      const token = await authService.register(userData);
      res.cookie('auth', token, {httpOnly: true, SameSite:'Lax'});
      res.status(200).json({ message: 'Registration successful' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   };
};

const loginUser = async (req, res) => {
   const loginData = req.body;
   try {
      const token = await authService.login(loginData);
      res.cookie('auth', token, {httpOnly: true, SameSite:'Lax'});
      res.status(200).json({ message: 'Login successful' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   };
};

const logoutUser = async (req, res) => {
   try {
      res.clearCookie('auth');
      res.status(200).json({ message: 'Logout successful' });
   } catch (err) {
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
   loginUser,
   logoutUser
}