const bcrypt = require('bcrypt');

const generateToken = require('../utils/tkn');
const {userModel} = require('../models/index');

exports.register = async (userData) => {
   if (userData.password !== userData.rePassword) {
      throw new Error('Password mismatch');
   };

   const user = await userModel.findOne({ username: userData.username });
   if (user) {
      throw new Error('This Username already exists!');
   };

   const createdUser = await userModel.create(userData);
   const token = await generateToken(createdUser);
   return {token, username: createdUser.username, id: createdUser._id};
};

exports.login = async ({ username, password }) => {
   const user = await userModel.findOne({ username });
   if (!user) {
      throw new Error('Email or password is invalid');
   };

   const isValid = await bcrypt.compare(password, user.password);
   if (!isValid) {
      throw new Error('Email or password is invalid');
   };

   const token = await generateToken(user);
   return {token, username: user.username, id: user._id};
};

exports.getUserInfo = async (userId) => userModel.findById(userId).populate('booksOwned', 'title _id').populate('booksRequested', 'title _id');

exports.getMyInfo = async (userId) => userModel.findById(userId).populate('booksOwned', 'title _id').populate('booksRequested', 'title _id');

exports.editMyInfo = async (userId, payload) => userModel.findByIdAndUpdate(userId, payload, { runValidators: true })