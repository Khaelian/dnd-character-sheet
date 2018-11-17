import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {Required, DBEntity} from '../DBUtils'

@Entity()
class Character extends DBEntity {
  constructor(props) {
    super()
    // need to check if props exist because TypeORM makes empty objects while spinning up
    if (props) Object.keys(props).forEach((key) => this[key] = props[key])
  }
  @PrimaryGeneratedColumn()
  id = undefined

  @Required
  @Column({type: 'text'})
  name = undefined

  @Required
  @Column({type: 'text'})
  playerId = undefined

  @Required
  @Column({type: 'text'})
  characterClass = undefined

  @Column({type: 'text', nullable: true})
  imageUrl = undefined

  @Column({type: 'timestamp with time zone', default: () => `(now() at time zone 'utc')`})
  created = undefined

  @Column({type: 'bool', default: 'true'})
  active = undefined
}

export default Character