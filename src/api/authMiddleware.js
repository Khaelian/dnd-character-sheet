import decodeToken from './utils/decode-token'

const authMiddleware = async (req, res, next) => {
  const {authorization} = req.headers

  if (!authorization) {
    res.status(401).send()
    return
  }

  const token = authorization.replace(/^bearer /i, '')

  try {
    const userObject = await decodeToken(token)
    req.user = userObject
    next()
  } catch (err) {
    res.status(401).send()
  }
}

export default authMiddleware
