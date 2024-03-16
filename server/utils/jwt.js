const util = require('util');
const jwt = require('jsonwebtoken');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

module.exports = {
   sign,
   verify,
};