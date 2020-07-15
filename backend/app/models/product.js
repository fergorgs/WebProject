const mongoose = require('../../database')
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Preencha o nome!'],
    },
    price:{
        type:Number,
        required:[true, 'Preencha o preço!']
    },
    description:{
        type:String,
        required:[true, 'Preencha a descrição!']
    },
    quantity:{
        type:Number,
        required:[true, 'Preencha a quantidade inicial!']
    },
    imgPath:{
        type:String
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product