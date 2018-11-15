import {Storage} from '@google-cloud/storage'
import dotenv from 'dotenv'
import fs from 'fs'

const getEnv = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('.env')) {
      // running locally or I pushed secrets to github :D
      // it's funny, because in the same commit where I pushed the previous line, I also committed .env.old to git...
      console.log('Secrets loaded locally')
      // process.env.APP_ENV = 'local'
      dotenv.config()
      resolve()
      return
    }

    const {GOOGLE_CLOUD_PROJECT: projectId} = process.env
    const bucketName = `${projectId}.appspot.com`
    console.log(`Retrieving secrets from '${bucketName}'`)
    new Storage({projectId})
      .bucket(bucketName)
      .file('.env')
      .download()
      .then((data) => {
        const config = dotenv.parse(data)
        process.env = {
          ...process.env,
          ...config,
        }
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default getEnv