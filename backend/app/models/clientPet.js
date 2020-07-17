const mongoose = require('../../database')
const ClientPetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Preecha o nome!'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  breed: {
    type: String,
    required: [true, 'Preencha a raça!'],
  },
  age: {
    type: Number,
    required: [true, 'Preencha a idade!'],
  },
  photo: {
    type: String,
    default:''
  },
  gender: {
    type: String,
    required: [true, 'Preencha o sexo!'],
  },
})

const ClientPet = mongoose.model('ClientPet', ClientPetSchema)
module.exports = ClientPet