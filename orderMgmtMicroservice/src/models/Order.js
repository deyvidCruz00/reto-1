const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: [true, 'Customer ID is required'],
    trim: true
  },
  orderID: {
    type: String,
    required: [true, 'Order ID is required'],
    unique: true,
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Received', 'In progress', 'Sended'],
    default: 'Received',
    trim: true
  }
}, {
  timestamps: true
});

// Index para búsquedas por customerID
orderSchema.index({ customerID: 1 });

// Index único para orderID
orderSchema.index({ orderID: 1 }, { unique: true });

module.exports = mongoose.model('Order', orderSchema);