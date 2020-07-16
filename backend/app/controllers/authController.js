const express = require('express')
const Client = require('../models/client')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const crypto = require('crypto')
const authConfig = require('../../config/auth.json')
//const mailer = require('../../modules/mailer')

function generateToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
  return token
}

router.post('/registerClient', async (req, res) => {
  const { email } = req.body
  try {
    if (await Client.findOne({ email }))
      return res.status(400).send({ error: 'Client already exists!' })

    const client = await Client.create(req.body)
    client.password = undefined

    return res.send({
      client,
      token: generateToken({ id: client.id }),
    })
  } catch (err) {
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

  res.send({
    client,
    token: generateToken({ id: client.id }),
  })
})

/*
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body

  try {
    const client = await Client.findOne({ email })

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
        to: email,
        from: 'danielbarretto@usp.br',
        template: '/auth/forgotPassword',
        context: { token },
      },
      (err) => {
        if (err)
          res.status(400).send({ error: 'Cannot send forgot password email!' })
      }
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(400).send({ error: 'Error on forgot password, try again' })
  }
  1
})

router.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body

  try {
    const client = await Client.findOne({ email }).select(
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
