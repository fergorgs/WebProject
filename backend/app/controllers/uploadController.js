const fs = require('fs')
const Client = require('../models/client')
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
    if(!client) return res.status(400).send({error:'Cliente não encontrado!'}) 
    
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: `Error uploading file ${err}` })
  }
})

module.exports = (app) => app.use('/upload', router)
