const express = require('express')
const Product = require('../models/product')
const router = express.Router()

router.post('/add', async (req, res) => {
  try {
    const { name, description, price, quantity, type } = req.body
    if (
      name === '' ||
      description === '' ||
      price === null ||
      quantity === null
    )
      return res.status(400).send({ erroFr: 'Preencha todos os campos!' })

    const service = await Product.create(req.body)
    if (!service)
      return res.status(400).send({ error: 'Erro ao criar produto!' })

    return res.send({ _id: service._id })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao cadastrar produto!' })
  }
})

module.exports = (app) => app.use('/product', router)
