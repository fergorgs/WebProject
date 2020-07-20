const express = require('express')
const Client = require('../models/client')
const Admin = require('../models/client')
const router = express.Router()
const bcrypt = require('bcryptjs')
//const mailer = require('../../modules/mailer')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const validarCPF = require('../utils/validaCpf')
router.use(cookieParser())

function generateToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
  return token
}


router.post('/registerClient', async (req, res) => {
  const { email, name, cpf, address, phone, password } = req.body
  try {
    //Utliza array de erros para enviar todas mensagens de uma vez
    let errors = []
    if (
      email === '' ||
      name === '' ||
      password === '' ||
      address === '' ||
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

      if (address.length < 10)
        errors.push('Endereço deve ter mais de 10 caracteres!')
    }

    if (errors.length > 0) {
      let message = ''
      errors.forEach((err) => {
        message += `${err}\n`
      })
      return res.status(400).send({ error: message })
    }
    //Caso não tenha nenhum erro, cadastra o usuário

    if (await Client.findOne({ email }))
      return res.status(400).send({ error: 'Email já cadastrado!' })

    if (await Client.findOne({ cpf }))
      return res.status(400).send({ error: 'Cpf já cadastrado!' })

    const data = { email, name, cpf, address, phone, password }
    const client = await Client.create(data)
    client.password = undefined
    const token = generateToken({ id: client.id })
    res.cookie('token', token, { httpOnly: true, sameSite: true })
    return res.send({
      client: client,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Registration failed!' })
  }
})

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body

  const client = await Client.findOne({ email }).select('+password')

  if (!client) return res.status(400).send({ error: 'Client not found!' })

  if (!(await bcrypt.compare(password, client.password)))
    return res.status(400).send({ error: 'Invalid password!' })

  client.password = undefined
  const token = generateToken({ id: client.id })
  res.cookie('token', token, { httpOnly: true, sameSite: true })
  return res.send({
    client: client,
  })
})

router.post('/authenticate_admin', async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email }).select('+password')

  if (!admin) return res.status(400).send({ error: 'admin not found!' })

  if (!(await bcrypt.compare(password, admin.password)))
    return res.status(400).send({ error: 'Invalid password!' })

  admin.password = undefined
  const token = generateToken({ id: admin.id })
  res.cookie('token', token, { httpOnly: true, sameSite: true })
  return res.sendStatus(200)
})


/*
router.post('/forgot_password', async (req, res) => {
  const { cpf } = req.body

  try {
    const client = await Client.findOne({ cpf })

    if (!client) return res.status(400).send({ error: 'Client not found' })

    const token = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await Client.findByIdAndUpdate(
      client.id,
      {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      },
      { new: true, useFindAndModify: false }
    )

    mailer.sendMail(
      {
        to: cpf,
        from: 'danielbarretto@usp.br',
        template: '/auth/forgotPassword',
        context: { token },
      },
      (err) => {
        if (err)
          res.status(400).send({ error: 'Cannot send forgot password cpf!' })
      }
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(400).send({ error: 'Error on forgot password, try again' })
  }
  1
})

router.post('/reset_password', async (req, res) => {
  const { cpf, token, password } = req.body

  try {
    const client = await Client.findOne({ cpf }).select(
      '+passwordResetToken passwordResetExpires'
    )

    if (!client) return res.status(400).send({ error: 'Client not found' })

    if (token !== client.passwordResetToken)
      return res.status(400).send({ error: 'Invalid token!' })

    const now = new Date()
    if (now > client.passwordResetExpires)
      return res
        .status(400)
        .send({ errors: 'Expired token, please generate a new one!' })

    client.password = password
    await client.save()
    res.sendStatus(200)
  } catch (err) {
    res.status(400).send({ error: 'Cannot reset password, try again' })
  }
})
*/
module.exports = (app) => app.use('/auth', router)
