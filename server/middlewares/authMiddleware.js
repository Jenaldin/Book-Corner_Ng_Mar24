const jwt = require('../utils/jwt');
const secret = process.env.SECRET || 'fiuwehfiuherfnjvppev10978434yhx1489357m30945rc1mh19';

exports.authMiddleware = async (req, res, next) => {
   const token = req.cookies['auth'];
   if (!token) {
      return next();
   };

   //This checks if token has expired or not etc.
   try {
      const decodedToken = await jwt.verify(token, secret);
      req.user = decodedToken;
      res.locals.isAuthenticated = true;
      res.locals.user = decodedToken; // THIS IS NEEDED IF WE NEED TO DISPLAY USER NAME SOMEPLACE FOR EXAMPLE
      next();
   } catch (err) {
      res.clearCookie('auth');
      res.redirect('/auth/login');
   };
};

//BELOW 2 CHECK IF THE USER IS GUEST OR LOGGED USER AND CAN BE USED IN VARIOUS SCENARIOS
exports.isAuth = (req, res, next) => {
   if (!req.user) {
      return res.redirect('/auth/login');
   };
   next();
};

exports.isGuest = (req, res, next) => {
   if (req.user) {
      return res.redirect('/');
   };
   next();
};