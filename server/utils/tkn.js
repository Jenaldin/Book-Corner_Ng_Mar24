const jwt = require('./jwt');
const secret = process.env.SECRET || 'fiuwehfiuherfnjvppev10978434yhx1489357m30945rc1mh19';

function generateToken(user) {
   const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
   };
   return jwt.sign(payload, secret, { expiresIn: '1h' });
};

module.exports = generateToken;