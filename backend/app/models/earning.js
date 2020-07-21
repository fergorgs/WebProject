const mongoose = require('../../database')
const EarningSchema = new mongoose.Schema({
    originId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

const Earning = mongoose.model('Earning', EarningSchema)
module.exports = Earning