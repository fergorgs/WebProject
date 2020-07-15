const mongoose = require('../../database')
const CartSchema = new mongoose.Schema({
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }],
    purchaseDate:{
        type:Date,
        default:Date.now,
    },
    totalPrice:{
        type:Number,
        require:true,
        default:0.0
    }
})