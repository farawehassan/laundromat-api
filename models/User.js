const mongoose = require('mongoose');

/// Basic details of a user, you can add more
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please tell us your full name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;