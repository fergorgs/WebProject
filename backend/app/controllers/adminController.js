const express = require('express')
const Admin = require('../models/admin')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const validarCPF = require('../utils/validaCpf')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

function generateToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
  return token
}

router.use(authMiddleware)

router.post('/add', async (req, res) => {
  const { email, name, cpf, phone, password } = req.body
  try {
    //Utliza array de erros para enviar todas mensagens de uma vez
    let errors = []
    if (
      email === '' ||
      name === '' ||
      password === '' ||
      cpf === '' ||
      phone === ''
    )
      errors.push('Preencha todos os campos!')
    else {
      if (!validarCPF(cpf)) errors.push('CPF Inválido')
      //Regex para checagem de email
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (!emailRegexp.test(email)) errors.push('Email inválido!')

      if (password.length < 8)
        errors.push('Senha deve ter mais de 8 caracteres!')

      if (password.indexOf(' ') != -1)
        errors.push('Senha não pode conter espaços!')
    }

    if (errors.length > 0) {
      let message = ''
      errors.forEach((err) => {
        message += `${err}\n`
      })
      //return res.status(400).send({ error: message })
    }
    //Caso não tenha nenhum erro, cadastra o usuário

    if (await Admin.findOne({ email }))
      return res.status(400).send({ error: 'Email já cadastrado!' })

    if (await Admin.findOne({ cpf }))
      return res.status(400).send({ error: 'Cpf já cadastrado!' })

    const data = { email, name, cpf, phone, password }
    const admin = await Admin.create(data)
    admin.password = undefined
    const token = generateToken({ id: admin.id })
    res.cookie('token', token, { httpOnly: true, sameSite: true })
    return res.send({
      id: admin.id,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Registration failed!' })
  }
})

module.exports = (app) => app.use('/admin', router)
