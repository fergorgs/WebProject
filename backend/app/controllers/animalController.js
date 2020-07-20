const express = require('express')
const Animal = require('../models/animal')
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

router.get('/:id', async (req, res)=>{
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

module.exports = (app) => app.use('/animal', router)
