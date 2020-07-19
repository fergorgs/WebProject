const multer = require('multer')

const imageFilter = (req, file, cb) => {
  
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Por favor, envie apenas imagens!', false)
  }
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'resources/static/assets/profilePics')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const uploadImage = multer({ storage: storage, fileFilter: imageFilter })
module.exports = uploadImage
