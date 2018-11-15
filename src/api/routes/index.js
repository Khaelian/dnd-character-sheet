import {Router} from 'express'

import CharacterRoute from './character'

const app = Router()

app.use('/character', CharacterRoute)

export default app