const express = require('express')
const Animal = require('../models/animal')
const Client = require('../models/client')
const ClientPet = require('../models/clientPet')
const Earning = require('../models/earning')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
router.use(authMiddleware)

router.post('/add', async (req, res) => {
  try {
    const { name, age, breed, sex, adoptionMethod, price } = req.body
    if (
      name === '' ||
      age === null ||
      breed === '' ||
      sex === '' ||
      price === null
    ) {
      return res.status(400).send({ error: 'Preencha todos os campos!' })
    }
    const animal = await Animal.create(req.body)
    if (!animal) return res.status(400).send({ error: 'Erro ao criar animal!' })

    return res.send({ id: animal.id })
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Erro ao adicionar novo animal: ' + err })
  }
})

router.get('/get', async (req, res) => {
  try {
    const animals = await Animal.find({})
    if (!animals)
      return res.status(404).send({ error: 'Nenhum animal registrado!' })
    return res.send({ animals })
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao resgatar animais ' + err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const animal = await Animal.findById(id)
    if (!animal)
      return res.status(404).send({ error: 'Nenhum produto cadastrado!' })

    return res.send({ animal })
  } catch (err) {
    return res.status(400).send({ error: 'Erro resgatar animal!' + err })
  }
})

router.post('/purchase', async (req, res) => {
  try {
    const { ownerId, petId } = req.body
    const animal = await Animal.findById(petId)
    if (!animal) return res.status(400).send({ error: 'Erro ao buscar animal' })

    const owner = await Client.findById(ownerId)
    if (!owner)
      return res.status(400).send({ error: 'Erro ao buscar o cliente' })

    const newPet = await ClientPet.create({
      name: animal.name,
      photo: animal.photo,
      breed: animal.breed,
      gender: animal.gender,
      age: animal.age,
      clientId: owner.id,
    })
    if (!newPet)
      return res.status(400).send({ error: 'Erro ao criar novo pet' })

    owner.updateOne({ $push: { pets: newPet } }, (err)=>{
      if(err) return res.status(400).send({ error: 'Erro ao salvar pet' })
    })

    const earning = await Earning.create({
      originId:newPet.id,
      type:'Venda de Pet',
      name:animal.name,
      quantity:1,
      value:animal.price
    })
    if(!earning) res.status(400).send({ error: 'Erro ao registrar compra' })

    await animal.deleteOne({_id:animal.id})

    return res.sendStatus(200)
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao finalizar a compra!' })
  }
})

router.post('/adopt', async (req, res)=>{
  try {
    const { ownerId, petId } = req.body
    const animal = await Animal.findById(petId)
    if (!animal) return res.status(400).send({ error: 'Erro ao buscar animal' })

    const owner = await Client.findById(ownerId)
    if (!owner)
      return res.status(400).send({ error: 'Erro ao buscar o cliente' })

    const newPet = await ClientPet.create({
      name: animal.name,
      photo: animal.photo,
      breed: animal.breed,
      gender: animal.gender,
      age: animal.age,
      clientId: owner.id,
    })
    if (!newPet)
      return res.status(400).send({ error: 'Erro ao criar novo pet' })

    owner.updateOne({ $push: { pets: newPet } }, (err) => {
      if (err) return res.status(400).send({ error: 'Erro ao salvar pet' })
    })

    await animal.deleteOne({ _id: animal.id })

    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao finalizar a adoção!' })
  }
})

module.exports = (app) => app.use('/animal', router)
