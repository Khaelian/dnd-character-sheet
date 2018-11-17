// express
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import AuthRoute from './routes/auth'
import auth from './authMiddleware'

// misc
import chalk from 'chalk'
import path from 'path'

// custom
import {connectToDb} from './orm'
import getEnv from './getEnv'

getEnv()
  .then(connectToDb)
  .catch((err) => {
    console.log('Error retrieving secrets:', err)
  })

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())

// allow the auth route before we hit the middleware as the auth route retrieves the JWT
app.use('/api/auth', AuthRoute)

app.use(auth)

app.use('/api', routes)

app.use(express.static('build'))
app.use('*', (req, res) => {
  const indexLocation = path.join(process.cwd(), './build/index.html')
  res.sendFile(indexLocation)
})

app.listen(port, () => {
  console.log(chalk.blue(`App available on port ${chalk.yellow(port)}.`))
})



