const express = require('express')
const Service = require('../models/service')
const Client = require('../models/client')
const ClientPet = require('../models/clientPet')
const router = express.Router()

router.post('/add', async (req, res) => {
  try {
    const { clientCpf, clientPetName, date, serviceType } = req.body
    if (date === null || serviceType === null || clientCpf===null || clientPetName === null)
      return res.status(400).send({ error: 'Preencha todos os campos!' })

    const service = await Service.create(req.body)
    if (!service)
      return res.status(400).send({ error: 'Erro ao criar serviço!' })

    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao cadastrar serviço!' })
  }
})

router.post('/clientPet', async (req, res) => {
  try {
    const { cpf } = req.body
    const client = await Client.findOne({ cpf })
    if (!client)
      return res.status(400).send({ error: 'Cliente não encontrado' })
    const petIds = await client.get('pets')
    const pets = await ClientPet.find({
      _id: { $in: await petIds },
    })
    if (!pets) return res.status(400).send({ error: 'Cliente não possui pets' })
    const petNames = pets.map((pet) => {
      return pet.name
    })
    return res.send(petNames)
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Erro ao procurar pets do cliente! ' + err })
  }
})

module.exports = (app) => app.use('/service', router)
