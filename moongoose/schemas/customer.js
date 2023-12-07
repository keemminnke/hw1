const crypto = require('crypto');
const mongoose = require('mongoose');
require("dotenv").config()
const { Schema } = mongoose;

const customerSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  
});

customerSchema.methods.setPassword = function (password) {
  // Hash the password using PBKDF2
  this.password = crypto.pbkdf2Sync(password, '', 10000, 64, 'ha512').toString('hex');
};

customerSchema.methods.verifyPassword = function (password) {
  // Hash the provided password and compare with the stored hash
  const hash = crypto.pbkdf2Sync(password, '', 10000, 64, 'ha512').toString('hex');
  return this.password === hash;
};


const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
