const express = require('express')
const Animal = require('../models/animal')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
router.use(authMiddleware)

router.post('/add', async (req, res) => {
  try {
    const { name, age, breed, sex, adoptionMethod, price } = req.body
    if(name === '' || age === null || breed === '' || sex === '' || price === null){
        return res.status(400).send({error:'Preencha todos os campos!'})
    }
    const animal = await Animal.create(req.body)
    if(!animal) return res.status(400).send({error:'Erro ao criar animal!'})

    return res.send({id:animal.id})
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Erro ao adicionar novo animal: ' + err })
  }
})

module.exports = (app) => app.use('/animal', router)
