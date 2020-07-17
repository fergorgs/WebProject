const express = require('express')
const ClientPet = require('../models/clientPet')
const Client = require('../models/client')
const router = express.Router()

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
    return res.status(400).send({error: 'Error getting pets: '+err})
  }
})

module.exports = (app) => app.use('/pet', router)
