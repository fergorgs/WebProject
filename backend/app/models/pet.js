const mongoose = require('../../database')
const Pet = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Preecha o nome!'],
  },
  breed: {
    type: String,
    required: [true, 'Preencha a raça!'],
  },
  age: {
    type: Number,
    required: [true, 'Preencha a idade!'],
  },
  imgPath: {
    type: String,
  },
  gender: {
    type: String,
    required: [true, 'Preencha o sexo!'],
  },
  especies:{
      type:String,
      required:[true, 'Preencha a espécie!']
  },
  adoptionMethod:{
      type:String,
      required:[true, 'Preencha o tipo de adoção!']
  },
  price:{
      type:Number,
      default:0.0
  }
})

const Pet = mongoose.model('Pet', Pet)
module.exports = Pet
