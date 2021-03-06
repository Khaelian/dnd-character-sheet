import {createConnection, getConnection as nativeGetConnection} from 'typeorm'
// import fs from 'fs'
// import path from 'path'

import Character from './Entities/Character'
import User from './Entities/User'

const checkDb = (resolve) => {
    if (process.env.dbAvailable) {
      resolve(nativeGetConnection())
      return true
    } else {
      console.log('DB connection not available, waiting .5s')
      setTimeout(() => checkDb(resolve), 500)
    }
}

export const getConnection = async () => {
  return new Promise((resolve, reject) => {
    checkDb(resolve)
  })
}

export const connectToDb = () => {
  return new Promise((resolve, reject) => {
    const {
      DB_DRIVER,
      DB_HOST,
      DB_PORT,
      DB_VOLUME,
      DB_USERNAME,
      DB_PASSWORD,
      APP_ENV,
    } = process.env

    // const entityDirectory = path.join(__dirname, './Entities')

    // const entities = fs.readdirSync(entityDirectory)
    //   .filter((fileName) => /.+\.js/i.test(fileName))
    //   .map((fileName) => require(path.join(entityDirectory, fileName)))

    // const isLocal = (APP_ENV === 'local')
    const isLocal = false

    console.log('Configuring DB Connection')
    createConnection({
      type: DB_DRIVER,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_VOLUME,
      entities: [
        Character,
        User,
      ],
      // bad stuff for production
      dropSchema: isLocal,
      synchronize: isLocal,
      logging: isLocal,
    }).then(() => {
      process.env.dbAvailable = true
      resolve()
    }).catch((err) => {
      console.log('Error connecting to database:', err)
      reject()
    })
  })
}
