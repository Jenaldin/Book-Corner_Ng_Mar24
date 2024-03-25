const authService = require('../services/authService');

const registerUser = async (req, res) => {
   const userData = req.body;
   try {
      const result = await authService.register(userData);
      const { token, username, id } = result;
      res.cookie('auth', token, {maxAge: 3000 * 60 * 60, httpOnly: true});
      res.status(200).json({ message: 'Registration successful', username, id });
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
      const result = await authService.login(loginData);
      const { token, username, id } = result;
      res.cookie('auth', token, {maxAge: 3000 * 60 * 60,httpOnly: true});
      res.status(200).json({ message: 'Login successful', username, id });
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

const getUser = async (req, res) => {
   try {
      const item = await authService.getUserInfo(req.params.userId);
      res.send(item);
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   }
}

const getMyUser = async (req, res) => {
   try {
      const item = await authService.getMyInfo(req.params.userId);
      res.send(item);
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   }
};

const editMyUser = async (req, res) => {
   const payload = req.body;
   const { userId } = req.params;
   try {
      await authService.editMyInfo(userId, payload);
      res.json({ message: 'User info updated successfully' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: errMsg});
      } else {
        res.status(500).json({ message: errMsg});
      }
   }
}

module.exports = {
   registerUser,
   loginUser,
   logoutUser,
   getUser,
   getMyUser,
   editMyUser,
}