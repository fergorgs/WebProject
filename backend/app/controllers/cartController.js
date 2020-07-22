const express = require('express')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Earning = require('../models/earning')
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

    const itemIndex = cart.products.findIndex((p) => p.prodId == productId)
    if (itemIndex > -1) {
      let productInCart = cart.products[itemIndex]
      productInCart.quantity += parseInt(quantity)
      cart.products[itemIndex] = productInCart
    } else {
      cart.products.push({ prodId: productId, quantity })
    }
    cart.totalPrice += quantity * product.price
    await cart.save()

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
    const { prodId, cartId, delta, quantity, price } = req.body

    const cart = await Cart.findOneAndUpdate(
      { _id: cartId, 'products.prodId': prodId },
      {
        $set: { 'products.$.quantity': quantity },
        $inc: {
          totalPrice: delta * price,
        },
      },
      { new: true }
    )
    if (!cart)
      return res.status(400).send({ error: 'Carrinho não encontrado!' })
    return res.send({ totalPrice: cart.totalPrice })
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Erro ao atualizar a quantidade ' + err })
  }
})

router.delete('/removeProd', async (req, res) => {
  try {
    const { cartId, prodId, price, quantity } = req.body

    const cart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $pull: { products: { prodId: prodId } },
        $inc: { totalPrice: -(price * quantity) },
      },
      { new: true }
    )
    if (!cart)
      return res.status(400).send({ error: 'Carrinho não encontrado!' })

    return res.send({ cart })
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao remover produto ' + err })
  }
})

router.post('/purchase', async (req, res) => {
  try {
    const { cartId } = req.body
    const cart = await Cart.findById(cartId)
    if (!cart)
      return res.status(400).send({ error: 'Erro ao encontrar carrinho' })

    for (prod of cart.products) {
      console.log(prod)
      const product = await Product.findByIdAndUpdate(
        prod.prodId,
        {
          $inc: { quantity: -prod.quantity },
        },
        (err) => {
          if (err)
            return res.status(400).send({ error: 'Erro ao atulizar estoque' })
        }
      )
      let prodEarning = await Earning.findOne({ originId: product.id })
      console.log(prodEarning)
      if (!prodEarning) {
        prodEarning = await Earning.create({
          originId: product.id,
          quantity: prod.quantity,
          value: product.price,
          name: product.name,
          type: 'Venda de Produto',
        })
      } else {
        prodEarning.quantity += parseInt(prod.quantity)
        prodEarning.value += parseFloat(prod.quantity) * product.price
        await prodEarning.save()
      }
    }
    await cart.deleteOne({_id:cartId})
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao finalizar a compra ' + err })
  }
})

module.exports = (app) => app.use('/cart', router)
