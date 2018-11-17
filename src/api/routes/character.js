import {Router} from 'express'
import {getConnection} from '../orm'
import Character from '../orm/Entities/Character'
import {hasMissingParameters} from '../orm/DBUtils'

const app = Router()

app.get('/', async (req, res) => {
  const {
    sub: playerId,
  } = req.user
  try {
    const conn = await getConnection()
    const characters = await conn
      .getRepository(Character)
      .find({
        active: true,
        playerId,
      })
    res.json(characters)
  } catch (err) {
    const errorMessage = 'Error fetching characters from DB'
    console.log(errorMessage, err)
    res.status(500).send(errorMessage)
  }
})

app.get('/:characterId', async (req, res) => {
  const {characterId: id} = req.params
  const {
    sub: playerId,
  } = req.user
  try {
    const conn = await getConnection()
    const character = await conn
      .getRepository(Character)
      .findOne({
        active: true,
        id,
        playerId,
      })
    if (character) res.json(character)
    else res.status(404).send(`No character found by id '${id}'`)
  } catch (err) {
    const errorMessage = 'Error fetching character from DB'
    console.log(errorMessage, err)
    res.status(500).send(errorMessage)
  }
})

app.post('/', async (req, res) => {
  const characterProps = req.body

  const {
    sub: playerId,
  } = req.user

  try {
    const newCharacter = new Character({
      ...characterProps,
      playerId,
    })
    if (hasMissingParameters(res, newCharacter)) return
    const conn = await getConnection()
    const dbCharacter = await conn
      .getRepository(Character)
      .save(newCharacter)
    res.json(dbCharacter)
  } catch (err) {
    const errMsg = 'Error while creating character'
    console.log(errMsg, err)
    res.status(500).send(errMsg)
  }
})


export default app
