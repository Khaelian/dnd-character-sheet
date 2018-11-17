import {Entity, PrimaryColumn, Column} from 'typeorm'

@Entity()
class User {
  constructor(props) {
    // need to check if props exist because TypeORM makes empty objects while spinning up
    if (props) Object.keys(props).forEach((key) => this[key] = props[key])
  }
  @PrimaryColumn({type: 'text'})
  id = undefined

  @Column({name: 'tkn', type: 'text'})
  token = undefined
}

export default User