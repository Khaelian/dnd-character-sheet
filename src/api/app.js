// express
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'

// misc
import chalk from 'chalk'

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

app.use('/api', routes)

app.use('/static', express.static('build'))
app.use(express.static('build'))
app.use('*', (req, res) => {
  res.sendFile('/build/index.html')
})

app.listen(port, () => {
  console.log(chalk.blue(`App available on port ${chalk.yellow(port)}.`))
})



