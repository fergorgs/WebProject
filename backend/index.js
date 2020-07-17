const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const dir = path.join(__dirname, '/resources/static/assets/profilePics')
app.use(express.static(dir))


require('./app/controllers/index')(app)

app.listen(5000, ()=>{
    console.log("Listening at 5000")
})