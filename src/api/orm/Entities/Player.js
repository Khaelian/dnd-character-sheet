import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class Player {
  constructor(props) {
    // need to check if props exist because TypeORM makes empty objects while spinning up
    if (props) Object.keys(props).forEach((key) => this[key] = props[key])
  }
  @PrimaryGeneratedColumn()
  id = undefined

  @Column({type: 'text'})
  name = undefined

  @Column({type: 'text'})
  email = undefined

  @Column({type: 'timestamp with time zone', default: () => `(now() at time zone 'utc')`})
  created = undefined

  @Column({type: 'bool', default: 'true'})
  active = undefined
}

export default Player