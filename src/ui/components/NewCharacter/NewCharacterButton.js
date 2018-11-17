import React, { Component } from 'react'
import SelectableCharacter from '../CharacterSelect/SelectableCharacter';

import {classes as classObj} from '../ClassIcon/ClassIcon'

const classes = Object.keys(classObj)

class NewCharacterButton extends Component {
  state = {
    activeClassIndex: 0,
  }

  componentDidMount = () => {
    this.swapInterval = setInterval(() => {
      this.setState(({activeClassIndex}) => {
        var newIndex
        do {
          newIndex = Math.floor(Math.random() * classes.length)
        } while (newIndex === activeClassIndex)
        return {activeClassIndex: newIndex}
      })
    }, 500)
  }

  componentWillUnmount = () => {
    clearInterval(this.swapInterval)
  }

  render () {
    const data = {
      id: 'new',
      name: 'New Character',
      characterClass: classes[this.state.activeClassIndex],
    }
    return (
      <SelectableCharacter data={data} hideClassText />
    )
  }
}

export default NewCharacterButton
