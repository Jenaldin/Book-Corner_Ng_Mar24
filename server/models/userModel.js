const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT) || 10;

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      minlength: [2, 'First Name should be at least 2 characters'],
   },
   lastName: {
      type: String,
      minlength: [2, 'Last Name should be at least 2 characters'],
   },
   username: {
      type: String,
      minlength: [2, 'Username should be at least 2 characters'],
      required: [true, 'Username is required'],
      unique: true,
   },
   email: {
      type: String,
      minlength: 10,
      required: [true, 'Email is required'],
   },
   password: {
      type: String,
      minlength: [6, 'Password should be at least 5 characters'],
      required: [true, 'Password is required'],
   },
   booksOwned: [{
      type: mongoose.Types.ObjectId,
      ref: 'Book',
   }],
   booksLeased: [{
      type: mongoose.Types.ObjectId,
      ref: 'Book',
   }],
   booksRented: [{
      type: mongoose.Types.ObjectId,
      ref: 'Book',
   }]
});

userSchema.pre('save', async function () {
   this.password = await bcrypt.hash(this.password, saltRounds)
});


const User = mongoose.model('User', userSchema);

module.exports = User;