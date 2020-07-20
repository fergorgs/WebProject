const express = require('express')
const Product = require('../models/product')
const Cart = require('../models/cart')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
router.use(authMiddleware)

router.post('/add', async (req, res) => {
  try {
    const { productId, quantity, clientId } = req.body
    let cart = await Cart.findOne({ clientId })
    if (!cart) cart = await Cart.create({ clientId })

    const product = await Product.findById(productId)
    if (!product) return res.send({ error: 'Erro ao buscar produto!' })

    const cartProd = { prodId: productId, quantity }
    await cart.update({
      $push: { products: cartProd },
      totalPrice: cart.totalPrice + quantity * product.price,
    })

    return res.sendStatus(200)
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Erro ao adicionar produto no carrinho ' + err })
  }
})

router.post('/get', async (req, res) => {
  try {
    const clientId = req.body.clientId
    let cart = await Cart.findOne({ clientId })
    if (!cart) cart = await Cart.create({ clientId })

    let finalCart = {
      totalPrice: cart.totalPrice,
      products: null,
    }
    finalCart.products = await Promise.all(
      cart.products.map(async (prod) => {
        const product = await Product.findById(prod.prodId)
        return {
          id:product._id,
          name: product.name,
          price: product.price,
          quantity: prod.quantity,
          photo: product.photo,
        }
      })
    )

    return res.send({ cart:finalCart })
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao buscar carrinho ' + err })
  }
})

module.exports = (app) => app.use('/cart', router)
