import React, { Component } from 'react'

// custom
import SelectableCharacter from '../CharacterSelect/SelectableCharacter'
import {classes as classObj} from '../ClassIcon/ClassIcon'

const classes = Object.keys(classObj)

class NewCharacterButton extends Component {
  state = {
    rotateInterval: 50,
    activeClassIndex: 0,
  }

  pickRandomClass = () => {
    console.log(this.state.rotateInterval)
    this.setState(({activeClassIndex}) => {
      var newIndex
      do {
        newIndex = Math.floor(Math.random() * classes.length)
      } while (newIndex === activeClassIndex)
      return {activeClassIndex: newIndex}
    })
    this.swapTimeout = setTimeout(this.pickRandomClass, this.state.rotateInterval)
  }

  slowClassRotation = () => {
    this.setState(({rotateInterval}) => ({
      rotateInterval: rotateInterval + 5
    }), () => {
      if (this.state.rotateInterval >= 5000) clearInterval(this.slowInterval)
    })
  }

  componentDidMount = () => {
    this.pickRandomClass()
    this.slowInterval = setInterval(this.slowClassRotation, 100)
  }

  componentWillUnmount = () => {
    clearTimeout(this.swapTimeout)
    clearInterval(this.slowInterval)
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
