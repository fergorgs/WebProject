const mongoose = require('../../database')
const bcryptjs = require('bcryptjs')
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Preencha o nome!'],
  },
  senha: {
    type: String,
    required: [true, 'Preencha a senha!'],
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  cpf: {
    type: String,
    required: [true, 'Preencha o cpf!'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'Preencha o endereço!']
  },
  email:{
      type:String,
      unique:true,
      required:[true, 'Preencha o email!'],
      lowercase:true
  },
  telefone:{
      type:String,
      required:[true, 'Preeccha o telefone!']
  },
  imgPath:{
      type:String,
      select:false
  },
  pets:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'ClientPet',
      required:true
  }]
})

ClientSchema.pre('save', async function(next){
    const hash = await bcryptjs.hash(this.password, 15)
    this.password = hash

    next()
})

const Client = mongoose.model('Client', ClientSchema)
module.exports = Client
