const mongoose = require('../../database')
const bcryptjs = require('bcryptjs')
const AdminSchema = new mongoose.Schema({
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
  email: {
    type: String,
    unique: true,
    required: [true, 'Preencha o email!'],
    lowercase: true,
  },
  telefone: {
    type: String,
    required: [true, 'Preeccha o telefone!'],
  },
  imgPath: {
    type: String,
    select: false,
  }
})

AdminSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.password, 15)
  this.password = hash
 
  next()
})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin
