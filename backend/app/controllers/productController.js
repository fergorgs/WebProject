const express = require('express')
const Product = require('../models/product')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
router.use(authMiddleware)

router.post('/add', async (req, res) => {
  try {
    const { name, description, price, quantity, type } = req.body
    if (
      name === '' ||
      description === '' ||
      price === null ||
      quantity === null
    )
      return res.status(400).send({ error: 'Preencha todos os campos!' })

    const service = await Product.create(req.body)
    if (!service)
      return res.status(400).send({ error: 'Erro ao criar produto!' })

    return res.send({ _id: service._id })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao cadastrar produto!' })
  }
})

router.get('/get', async (req, res) => {
  try {
    const products = await Product.find()
    if (!products)
      return res.status(400).send({ error: 'Nenhum produto cadastrado!' })

    return res.send({ products })
  } catch (err) {
    return res.status(400).send({ error: 'Erro resgatar produtos!' + err })
  }
})

router.post('/updateStock', async (req, res) => {
  try {
    const { id, quantity } = req.body
    const product = await Product.findByIdAndUpdate(id, { quantity })
    if (!product)
      return res.status(400).send({ error: 'Produto não encontrado!' })
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: 'Erro atualizar estoque!' + err })
  }
})

router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body
    const product = await Product.findByIdAndDelete(id)
    if (!product)
      return res.status(400).send({ error: 'Produto não encontrado!' })
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: 'Erro remover produto!' + err })
  }
})

module.exports = (app) => app.use('/product', router)
