const bcrypt = require('bcrypt');

const generateToken = require('../utils/tkn');
const {userModel} = require('../models/index');

exports.register = async (userData) => {
   if (userData.password !== userData.rePassword) {
      throw new Error('Password mismatch');
   };

   const user = await userModel.findOne({ email: userData.email });
   if (user) {
      throw new Error('User already exists');
   };

   const createdUser = await userModel.create(userData);
   const token = await generateToken(createdUser);
   return token;
};

exports.login = async ({ email, password }) => {
   const user = await userModel.findOne({ email });
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