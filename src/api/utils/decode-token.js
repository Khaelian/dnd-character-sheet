// jwt
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const client = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
})

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

const jwtOptions = {}

const decode = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, jwtOptions, (err, decoded) => {
      if (err) {
        reject()
        return
      }
      resolve(decoded)
    })
  })
}

export default decode