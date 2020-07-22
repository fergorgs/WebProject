const express = require('express')
const Client = require('../models/client')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
router.use(authMiddleware)

router.post('/update', async (req, res) => {
  try {
    const { email, name, phone, id, address } = req.body
    const client = await Client.findByIdAndUpdate(id, {
        email,
        name,
        address,
        phone,
    })
    if(!client) return res.status(400).send({ error: 'Erro ao atualizar perfil '})
    return res.sendStatus(200)
} catch (err) {
    return res.status(400).send({ error: 'Erro ao atualizar perfil ' + err })
  }
})

module.exports = (app) => app.use('/client', router)
