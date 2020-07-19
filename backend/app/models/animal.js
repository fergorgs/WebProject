const mongoose = require('../../database')
const AnimalSchema = new mongoose.Schema({
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
  specie:{
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
  },
  photo:{
    type:String
  }
})

const Pet = mongoose.model('Animal', AnimalSchema)
module.exports = Pet
