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
      cartId: cart._id,
    }
    finalCart.products = await Promise.all(
      cart.products.map(async (prod) => {
        const product = await Product.findById(prod.prodId)
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: prod.quantity,
          photo: product.photo,
        }
      })
    )

    return res.send({ cart: finalCart })
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao buscar carrinho ' + err })
  }
})

router.post('/updateQtd', async (req, res) => {
  try {
    const { prodId, cartId, quantity } = req.body

    const cart = await Cart.update(
      { _id: cartId, 'products.prodId': prodId },
      { $set: { 'products.$.quantity': quantity } }
    )
    if (!cart)
      return res.status(400).send({ error: 'Carrinho não encontrado!' })

    return res.sendStatus(200)
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Erro ao atualizar a quantidade ' + err })
  }
})

router.delete('/removeProd', async (req, res) => {
  try {
    const { cartId, prodId, price, quantity } = req.body

    const cart = await Cart.findByIdAndUpdate(cartId, {
      $pull: { products: { prodId: prodId } },
      $inc: {totalPrice: -(price*quantity)}
    }, {new:true})
    if (!cart)
      return res.status(400).send({ error: 'Carrinho não encontrado!' })

    
    return res.send({ cart })
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao remover produto ' + err })
  }
})

module.exports = (app) => app.use('/cart', router)
