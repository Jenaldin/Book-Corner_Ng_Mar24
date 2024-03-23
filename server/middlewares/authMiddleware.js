const jwt = require('../utils/jwt');
const secret = process.env.SECRET || 'fiuwehfiuherfnjvppev10978434yhx1489357m30945rc1mh19';

exports.authMiddleware = async (req, res, next) => {
   const token = req.cookies['auth'];

   if (!token) {
     return next();
   };
 
   try {
     const decodedToken = await jwt.verify(token, secret);
     req.user = decodedToken;
     res.locals.isAuthenticated = true;
     next();
   } catch (err) {
     res.clearCookie('auth');
     res.status(401).json({ message: 'Unauthorized' });
   };
 };
 
 exports.isAuth = (req, res, next) => {
   if (!req.user) {
     return res.status(401).json({ message: 'Unauthorized' });
   };
   next();
 };
 
 exports.isGuest = (req, res, next) => {
   if (req.user) {
     return res.status(403).json({ message: 'Forbidden' });
   };
   next();
 };