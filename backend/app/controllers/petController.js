const express = require('express')
const ClientPet = require('../models/clientPet')
const Client = require('../models/client')
const router = express.Router()
const fs = require('fs')
router.post('/add', async (req, res) => {
  try {
    const { petName, sex, breed, age, ownerId } = req.body
    if (petName === null || sex === null || breed === null || age === null)
      return res.status(400).send({ error: 'Preencha todos os campos!' })

    const data = { name: petName, gender: sex, breed, age, clientId: ownerId }
    const pet = await ClientPet.create(data)
    if (!pet) return res.status(400).send({ error: 'Erro ao criar pet!' })

    Client.update({ _id: ownerId }, { $push: { pets: pet } })
    return res.send(pet)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao cadastrar pet!' })
  }
})

router.post('/getClientPets', async (req, res) => {
  try {
    const { petsId } = req.body

    const pets = await ClientPet.find({
      _id: { $in: petsId },
    })
    if (pets.length > 0) return res.send(pets)
    else return res.status(400).send({ error: 'Você não tem nenhum pet!' })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Error getting pets: ' + err })
  }
})

router.delete('/remove', async (req, res) => {
  try {
    const { ownerId, petId, photo } = req.body
    await ClientPet.deleteOne({ _id: petId })
    const client = await Client.findOneAndUpdate({ _id: ownerId }, { $pull: { pets: petId } })
    fs.unlink(`./resources/static/assets/profilePics/${photo}`, (err) => {
      if (err) {
        return res
          .status(404)
          .send({ error: 'Arquivo de foto não encontrado!' })
      } else {
        return res.send(client)
      }
    })
  } catch (err) {
    return res.status(400).send({ error: 'Error removing pet! ' + err })
  }
})

module.exports = (app) => app.use('/pet', router)
