const mongoose = require('../../database')
const CartSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    unique: true,
    required: true,
  },
  products: [
    {
      prodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart
