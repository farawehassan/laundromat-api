const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: String,
    required: [true, 'Please tell us the item name!'],
  },
  totalCount: {
    type: Number,
    required: [true, 'Please provide the total count'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'Please provide the total amount'],
  },
  address: {
    type: String,
    required: [true, 'Please provide address to deliver to']
  },
  discount: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;