// express
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'

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

app.use('/api', routes)

app.use(express.static('build'))
app.use('*', (req, res) => {
  const indexLocation = path.join(process.cwd(), './build/index.html')
  res.sendFile(indexLocation)
})

app.listen(port, () => {
  console.log(chalk.blue(`App available on port ${chalk.yellow(port)}.`))
})



