const express = require('express')
const Earning = require('../models/earning')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
router.use(authMiddleware)

router.get('/get', async (req, res)=>{
    try{
        const earnings = await Earning.find({})
        if(!earnings) return res.status(404).send({error:'Nenhum faturamento encontrado'})

        return res.send({earnings})
    }catch(err){
        return res.status(400).send({error:'Erro ao buscar os faturamentos'})
    }
})

module.exports = (app) => app.use('/earning', router)