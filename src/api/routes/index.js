import {Router} from 'express'

import CharacterRoute from './character'
import AuthRoute from './auth'

const app = Router()

app.use('/character', CharacterRoute)
app.use('/auth', AuthRoute)

export default app