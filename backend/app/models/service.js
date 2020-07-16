const mongoose = require('../../database')
const ServiceSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  clientPetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientPet',
    required: true,
  },
  date:{
      type:Date,
      required:[true, 'Preencha a data!']
  },
  serviceType:{
      type:String,
      required:[true, 'Preencha o tipo de serviço!']
  }
})

const Service = mongoose.model('Service', ServiceSchema)
module.exports = Service