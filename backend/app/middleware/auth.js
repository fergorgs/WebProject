const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

function parseCookies(request) {
  let list = {},
    rc = request.headers.cookie

  rc &&
    rc.split(';').forEach((cookie) => {
      const parts = cookie.split('=')
      list[parts.shift().trim()] = decodeURI(parts.join('='))
    })

  return list
}

module.exports = (req, res, next) => {
  const authHeader = parseCookies(req)
  if (!authHeader || !authHeader.token) return res.status(401).send({ error: 'No token provided' })
  
  const parts = authHeader.token.split(' ')
  if (parts.length !== 2) return res.status(401).send({ error: 'Token error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Malformatted Token! ' })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid Token!' })

    req.userId = decoded.id
    return next()
  })
}
