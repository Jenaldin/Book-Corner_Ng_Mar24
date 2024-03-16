const bcrypt = require('bcrypt');

const generateToken = require('../utils/tkn');
const User = require('../models/UserModel');

exports.register = async (userData) => {
   if (userData.password !== userData.rePassword) {
      throw new Error('Password mismatch');
   };

   const user = await User.findOne({ email: userData.email });
   if (user) {
      throw new Error('User already exists');
   };

   const createdUser = await User.create(userData);
   const token = await generateToken(createdUser);
   return token;
};

exports.login = async ({ email, password }) => {
   const user = await User.findOne({ email });
   if (!user) {
      throw new Error('Email or password is invalid');
   };

   const isValid = await bcrypt.compare(password, user.password);
   if (!isValid) {
      throw new Error('Email or password is invalid');
   };

   const token = await generateToken(user);
   return token;
};