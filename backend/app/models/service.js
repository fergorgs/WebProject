const mongoose = require('../../database')
const ServiceSchema = new mongoose.Schema({
  clientCpf: {
    type: String,
    required: true,
  },
  clientPetName: {
    type: String,
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