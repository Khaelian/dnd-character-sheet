import {Router} from 'express'
import axios from 'axios';
import decode from '../utils/decode-token';

const app = Router()

const oauthValues = () => {
  const {
    GCP_OAUTH_CLIENT_ID: client_id,
    GCP_OAUTH_SECRET: client_secret,
    APP_ENV,
  } = process.env
  return {
    client_id,
    client_secret,
    APP_ENV,
  }
}

app.post('/', async (req, res) => {
  const {
    code,
    scope,
  } = req.body

  try {
    const {client_id, client_secret, APP_ENV} = oauthValues()
    const {data} = await axios.post('https://www.googleapis.com/oauth2/v4/token', {
      code,
      client_id,
      client_secret,
      redirect_uri: APP_ENV === 'local' ? 'http://localhost:3000/auth/login' : 'https://saturdaynightnaturals.appspot.com/auth/login',
      grant_type: 'authorization_code',
    })

    const {
      access_token,
      expires_in,
      token_type,
      refresh_token,
      id_token,
      scope,
    } = data

    try {
      const idToken = await decode(id_token)
      console.log(idToken)
      res.json({
        id_token,
        ...idToken,
      })
    } catch (err) {
      res.status(401).send()
    }

  } catch (err) {
    const errMsg = 'Error validating OAuth code'
    console.log(errMsg, err.message)
    res.status(401).send(errMsg)
  }
})

export default app
