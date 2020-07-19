const fs = require('fs')
const Client = require('../models/client')
const ClientPet = require('../models/clientPet')
const Animal = require('../models/animal')
const Product = require('../models/product')
const Admin = require('../models/admin')
const express = require('express')
const router = express.Router()
const uploadImage = require('../middleware/imageUpload')


router.post('/client', uploadImage.single('image'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({ error: 'Selecione uma imagem!' })
    }
    const client = await Client.findOneAndUpdate(req.body.id, {
      photo: req.file.filename,
    })
    if (!client)
      return res.status(400).send({ error: 'Cliente não encontrado!' })

    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: `Error uploading file ${err}` })
  }
})


router.post('/admin', uploadImage.single('image'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({ error: 'Selecione uma imagem!' })
    }
    const admin = await Admin.findOneAndUpdate(req.body.id, {
      photo: req.file.filename,
    })
    if (!admin)
      return res.status(400).send({ error: 'Administrador não encontrado!' })

    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: `Error uploading file ${err}` })
  }
})

router.post('/clientPet', uploadImage.single('image'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({ error: 'Selecione uma imagem!' })
    }
    const pet = await ClientPet.findOneAndUpdate(
      { _id: req.body.id },
      {
        photo: req.file.filename,
      }
    )
    if (!pet) return res.status(400).send({ error: 'Pet não encontrado!' })

    const owner = await Client.findByIdAndUpdate(
      pet.get('clientId'),
      {
        $push: { pets: pet._id },
      },
      (err) => {
        if (err) {
          console.log(err)
          return res.status(400).send({ error: 'Error or updating pets' })
        }
      }
    )

    return res.send(owner)
  } catch (err) {
    return res.status(400).send({ error: `Error uploading file ${err}` })
  }
})

router.post('/product', uploadImage.single('image'), async (req, res)=>{
  try {
    if (req.file === undefined) {
      return res.status(400).send({ error: 'Selecione uma imagem!' })
    }
    const product = await Product.findByIdAndUpdate(req.body.id, {
      photo: req.file.filename,
    })
    if (!product)
      return res.status(400).send({ error: 'Produto não encontrado!' })

    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: `Error uploading file ${err}` })
  }
})

router.post('/animal', uploadImage.single('image'), async (req, res)=>{
  try {
    if (req.file === undefined) {
      return res.status(400).send({ error: 'Selecione uma imagem!' })
    }
    const animal = await Animal.findByIdAndUpdate(req.body.id, {
      photo: req.file.filename,
    })
    if (!animal)
      return res.status(400).send({ error: 'Animal não encontrado!' })

    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: `Error uploading file ${err}` })
  }
})

module.exports = (app) => app.use('/upload', router)
