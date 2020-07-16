const mongoose = require('../../database')
const bcryptjs = require('bcryptjs')
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Preencha o nome!'],
  },
  password: {
    type: String,
    required: [true, 'Preencha a senha!'],
    select: false,
  },
  /*passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },*/
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
  phone:{
      type:String,
      required:[true, 'Preeccha o telefone!']
  },
  photo:{
      type:String,
      select:false,
      default:''
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
